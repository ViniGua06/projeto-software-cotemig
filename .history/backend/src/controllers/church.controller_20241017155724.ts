import { Request, Response } from "express";
import { ChurchRepository } from "../repositories/church.repository";
import { Church } from "../database/entity/Church";
import UserRepository from "../repositories/user.repository";
import path from "path";
import { Notice } from "../database/entity/Notice";

import { Event as Evento } from "../database/entity/Event";
import { Request } from "tedious";

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
        daily_verse: "",
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

  getNotices = async (req: Request, res: Response) => {
    try {
      const { church_id } = req.params;

      const notices = await churchRepository.getNotices(parseInt(church_id));

      res.status(200).json(notices);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  };

  createNotice = async (req: Request, res: Response) => {
    try {
      const notice: Notice = req.body;

      notice.aware = 0;

      await churchRepository.insertNotice(notice);

      res.status(201).json({ message: "Aviso criado!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  changeUserRole = async (req: Request, res: Response) => {
    try {
      const { church_id, user_id, role } = req.body;

      await churchRepository.changeUserRole(
        parseInt(church_id),
        parseInt(user_id),
        role
      );

      res.status(200).json({ message: "Permissões atualizadas!" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  };

  updateChurch = async (req: Request, res: Response) => {
    try {
      const church: Church = req.body;
      const { id } = req.params;

      await churchRepository.updateChurch(parseInt(id), church);

      res.status(200).json({ message: "Igreja atualizada!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };

  setAwareNumber = async (req: Request, res: Response) => {
    try {
      const { notice_id, user_id } = req.params;

      await churchRepository.setAware(parseInt(notice_id), parseInt(user_id));

      return res.status(200).json({ message: "número mudado!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  checkIfIsAlreadyAware = async (req: Request, res: Response) => {
    try {
      const { notice_id, user_id } = req.params;

      const result = await churchRepository.checkIfIsAlreadyAware(
        parseInt(notice_id),
        parseInt(user_id)
      );

      res.status(200).json({ message: result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

  getEvents = async (req: Request, res: Response) => {
    res.status(200).json(await churchRepository.getEvents());
  };

  createEvent = async (req: Request, res: Response) => {
    try {
      const event: Evento = req.body;

      const insertedEvent = await churchRepository.createEvent(event);

      res
        .status(201)
        .json({ message: `O evento ${insertedEvent} foi criado!` });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getEventsByChurches = async (req: Request, res: Response) => {
    try {
      const { churches } = req.body;

      const events = await churchRepository.getEventsByChurches(churches);

      res.status(200).json(events);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ error: error });
    }
  };

  getDailyVerse = async (req: Request, res: Response) => {
    const { church_id } = req.params;

    const verse = await churchRepository.getDailyVerse(parseInt(church_id));

    res.status(200).json(verse);
  };

  setDailyVerse = async (req: Request, res: Response) => {
    const { church_id } = req.params;
    const { verse } = req.body;

    await churchRepository.addDailyVerse(parseInt(church_id), verse);

    res.status(200).json({ message: "Versículo atualizado!" });
  };

  invitePerson = async (req: Request, res: Response) => {
    const { church_id } = req.body;
    const token = await churchRepository.createInvite(church_id);
  };
}
