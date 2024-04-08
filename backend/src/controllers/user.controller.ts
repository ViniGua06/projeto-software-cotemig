import { Request, Response } from "express";

import UserRepository from "../repositories/user.repository";
import { User } from "../database/entity/User";

import JsonWebToken from "../services/jwt.service";

const repository = new UserRepository();
const jwtService = new JsonWebToken();

class UserController {
  getUserById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const user = await repository.getUserById(parseInt(id));

      res.status(200).json({ user: user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Algum erro ocorreu!", error: error });
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const props: User = req.body;

      const userInserted = await repository.insertUser(props);

      if (!userInserted) {
        return res.status(500).json({ message: "Falha ao criar o usuário." });
      }

      const token = await jwtService.createToken(userInserted);

      return res
        .status(201)
        .json({ message: `Usuário ${userInserted} criado!`, token: token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Algum erro ocorreu!", error: error });
    }
  };
}

export default UserController;
