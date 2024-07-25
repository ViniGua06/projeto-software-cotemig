import { Router } from "express";
import { MessageController } from "../controllers/message.controller";

export const messageRouter = Router();

const messageController = new MessageController();

messageRouter.get(
  "/messages/:church_id",
  messageController.getMessagesByChurchId
);
