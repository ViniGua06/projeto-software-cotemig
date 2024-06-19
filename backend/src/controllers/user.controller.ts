import { Request, Response } from "express";

import UserRepository from "../repositories/user.repository";
import { User } from "../database/entity/User";

import JsonWebToken from "../services/jwt.service";
import { IEmail } from "../models/email.model";

import sendEmailService from "../services/sendEmail.service";
import path from "path";

const repository = new UserRepository();
const jwtService = new JsonWebToken();
const emailService = new sendEmailService();

class UserController {
  getAllUsers = async (req: Request, res: Response) => {
    const users = await repository.getAllUsers();

    res.status(200).json(users);
  };

  getUserProfilePhoto = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await repository.getUserById(parseInt(id));

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      console.log(user.photo);

      if (user.photo == null) {
        return res
          .status(404)
          .json({ message: "Foto de perfil não encontrada" });
      }

      const imagePath = path.resolve(__dirname, `../uploads/${user.photo}`);

      res.sendFile(imagePath);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erro ao buscar a foto de perfil", error });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const user = await repository.getUserById(parseInt(id));

      if (!user) {
        return res.status(403).json({ message: "Usuario não existe!" });
      }

      return res.status(200).json({ user: user });
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

      return res.status(201).json({
        message: `Usuário cadastrado!`,
        token: token,
        userId: userInserted,
      });
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
      res
        .status(500)
        .json({ message: "Algum erro ocorreu!", error: error.message });
    }
  };

  sendEmail = async (req: Request, res: Response) => {
    try {
      const props: IEmail = req.body;

      console.log(props);

      if (!(await emailService.handle(props))) {
        return res.status(200).json({ message: "Email enviado" });
      }

      return res.status(400).json({ message: "Bad request" });
    } catch (error) {
      console.log(error);
      res.status(200).json({ message: "Algum erro ocorreu!", error: error });
    }
  };

  forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      const user = await repository.checkIfEmailIsValid(email);

      if (!user) {
        return res.status(400).json({ message: "Email não cadastrado!" });
      }

      const token = jwtService.createToken(email);

      const emil = await emailService.handle({
        to: email,
        subject: "Recuperação de conta E-Church",
        text: `Clique nesse link para recuperar senha: ${frontUrl}/forgotPassword/${token}/${email}`,
      });

      res.status(200).json({ message: "Email Enviado!", token: token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  };

  testToken = (req: Request, res: Response) => {
    const { teste } = req.body;
    res.status(200).json({ message: "Autorizado" });
  };

  updatePassword = async (req: Request, res: Response) => {
    try {
      const { email, senha } = req.body;

      await repository.updatePassword(senha, email);

      res.status(200).json({ message: `A senha ${senha} foi updatada!` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  };

  loginUser = async (req: Request, res: Response) => {
    try {
      const { email, senha } = req.body;

      const user = await repository.getUserByEmailAndPassword(email, senha);

      if (!user) {
        return res.status(400).json({ message: "Credenciais erradas!" });
      }

      const token = jwtService.createToken(user.id);

      return res
        .status(200)
        .json({ message: "Logado!", token: token, userId: user.id });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  };

  changeProphilePhoto = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const photo = req.file.filename;

      console.log(id, photo);

      if (!repository.updatePhoto(id, photo)) {
        return res.status(400).json({ message: "Bad Request" });
      }

      console.log(req.file);

      return res.status(200).json({ message: "Imagem de perfil atualizada!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro no servidor", error: error });
    }
  };

  goToChurch = (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { church_id, role } = req.body;

      repository.goToChurch(church_id, parseInt(id), role);

      res.status(201).json({ message: "BOA" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro no servidor", error: error });
    }
  };

  enterChurch = async (req: Request, res: Response) => {
    try {
      const { user_id, code } = req.body;
      await repository.enterChurch(user_id, code);

      res.status(200).json({ message: "Entrou na igreja" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro", error: error.message });
    }
  };

  getChurchesByUser = async (req: Request, res: Response) => {
    const id = req.params.id;

    const churches = await repository.getChurchesByUser(parseInt(id));

    res.status(200).json(churches);
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro no servidor", error: error });
    }
  };
}

const frontUrl = "http://localhost:5173";

export default UserController;
