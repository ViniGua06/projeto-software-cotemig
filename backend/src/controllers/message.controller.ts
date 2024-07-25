import { Request, Response } from "express";
import { MessageRepository } from "../repositories/message.repository";
import { Message } from "../database/entity/Message";
const messageRepo = new MessageRepository();

export class MessageController {
  getMessagesByChurchId = async (req: Request, res: Response) => {
    try {
      const { church_id } = req.params;
      const messages = await messageRepo.selectMessagesByChurchId(
        parseInt(church_id)
      );

      res.status(200).json(messages);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
}
