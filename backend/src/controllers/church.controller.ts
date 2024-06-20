import { Request, Response } from "express";
import { ChurchRepository } from "../repositories/church.repository";
import { Church } from "../database/entity/Church";
import UserRepository from "../repositories/user.repository";
import path from "path";

const churchRepository = new ChurchRepository();
const userRepository = new UserRepository();

export class ChurchController {
  getChurches = async (req: Request, res: Response) => {
    try {
      const churches = await churchRepository.getAllChurches();

      res.status(200).json(churches);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro", error: error });
    }
  };

  getChurchById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const church = await churchRepository.getChurchById(parseInt(id));

      res.status(200).json(church);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro", error: error });
    }
  };

  createChurch = async (req: Request, res: Response) => {
    try {
      const { name, code } = req.body;
      const user_id = parseInt(req.params.id);

      const photo = req.file.filename;

      const churhcInserted = await churchRepository.insertChurch({
        name: name,
        photo: photo,
        code: code,
      });

      console.log(typeof churhcInserted, "7yausvdbio");

      if (typeof churhcInserted == "number")
        userRepository.goToChurch(churhcInserted, user_id, "admin");

      res.status(201).json({ message: "Igreja cadastrada!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro", error: error });
    }
  };

  getChurchProfilePhoto = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const church = await churchRepository.getChurchById(parseInt(id));

      if (church.photo == null) {
        return res
          .status(404)
          .json({ message: "Foto de perfil da não encontrada" });
      }

      const imagePath = path.resolve(__dirname, `../uploads/${church.photo}`);

      res.sendFile(imagePath);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erro ao buscar a foto de perfil", error });
    }
  };

  getChurchIntegrantProphilePhoto = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const photo = await churchRepository.getIntegrantProphilePhoto(
        parseInt(id)
      );

      if (photo == null) {
        return res
          .status(404)
          .json({ message: "Foto de perfil da não encontrada" });
      }

      const imagePath = path.resolve(__dirname, `../uploads/${photo}`);

      res.sendFile(imagePath);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message, error });
    }
  };

  getChurchIntegrants = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const integrants = await churchRepository.getChurchIntegrants(
        parseInt(id)
      );

      console.log(integrants, "INIBOUIDB");

      res.status(200).json(integrants);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  getUserRole = async (req: Request, res: Response) => {
    try {
      const { user_id, church_id } = req.params;

      const user = await churchRepository.getUserRole(
        parseInt(church_id),
        parseInt(user_id)
      );

      res.status(200).json(user.role);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  removeIntegrant = async (req: Request, res: Response) => {
    try {
      const { church_id, user_id } = req.params;
      await churchRepository.deleteIntegrant(
        parseInt(church_id),
        parseInt(user_id)
      );

      res.status(200).json({ message: "Usuário deletado!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
}
