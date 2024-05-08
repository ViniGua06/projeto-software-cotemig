import { Request, Response } from "express";

import UserRepository from "../repositories/user.repository";
import { User } from "../database/entity/User";

import JsonWebToken from "../services/jwt.service";
import { IEmail } from "../models/email.model";

import sendEmailService from "../services/sendEmail.service";
import { resolve } from "path";

const repository = new UserRepository();
const jwtService = new JsonWebToken();
const email = new sendEmailService();

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

      if (await repository.checkIfEmailIsValid(props.email)) {
        return res
          .status(400)
          .json({ message: `O email ${props.email} já está cadastrado!` });
      }

      const userInserted = await repository.insertUser(props);

      if (!userInserted) {
        return res.status(500).json({ message: "Falha ao criar o usuário." });
      }

      const token = jwtService.createToken(userInserted.toString());

      return res
        .status(201)
        .json({ message: `Usuário ${userInserted} criado!`, token: token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Algum erro ocorreu!", error: error });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const props: User = req.body;

      await repository.updateUser(props, parseInt(id));

      return res.status(200).json({ message: "Usuário atualizado" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Algum erro ocorreu!", error: error });
    }
  };

  sendEmail = async (req: Request, res: Response) => {
    try {
      const props: IEmail = req.body;

      console.log(props);

      if (!(await email.handle(props))) {
        return res.status(200).json({ message: "Email enviado" });
      }

      return res.status(400).json({ message: "Bad request" });
    } catch (error) {
      console.log(error);
      res.status(200).json({ message: "Algum erro ocorreu!", error: error });
    }
  };

  forgotPassword = (req: Request, res: Response) => {
    try {
      const emailF: IEmail = req.body;

      const token = jwtService.createToken(emailF.email);

      console.log(token);

      email.handle({
        subject: "Recuperação de conta",
        text:
          `Clique nesse link para recuperar senha: ${frontUrl}/forgotPassword/${token}` +
          token,
      });

      res.status(200).json({ message: "OLAs", token: token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  };

  testToken = (req: Request, res: Response) => {
    const { teste } = req.body;
    res.status(200).json({ message: "Autorizado" });
  };
}

const frontUrl = "http://localhost:5173";

export default UserController;
