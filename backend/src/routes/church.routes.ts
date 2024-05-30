import { Router } from "express";
import { ChurchController } from "../controllers/church.controller";
import multer from "multer";
import { storage } from "./multerConfig";

const churchRouter = Router();

const churchController = new ChurchController();

const upload = multer({ storage: storage });

churchRouter.get("/churches", churchController.getChurches);
churchRouter.get("/church/:id", churchController.getChurchById);
churchRouter.get("/church/photo/:id", churchController.getChurchProfilePhoto);
churchRouter.post(
  "/church/:id",
  upload.single("photo"),
  churchController.createChurch
);

export default churchRouter;
