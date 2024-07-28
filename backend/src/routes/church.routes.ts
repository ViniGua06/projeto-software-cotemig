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
churchRouter.get(
  "/church/:id/integrants",
  churchController.getChurchIntegrants
);
churchRouter.post(
  "/church/:id",
  upload.single("photo"),
  churchController.createChurch
);
churchRouter.get("/notices/:church_id", churchController.getNotices);

churchRouter.get("/role/:church_id/:user_id", churchController.getUserRole);
churchRouter.delete(
  "/integrant/:user_id/church/:church_id",
  churchController.removeIntegrant
);

churchRouter.post("/notice", churchController.createNotice);

churchRouter.put("/integrantrole", churchController.changeUserRole);
churchRouter.put("/church/:id", churchController.updateChurch);

export default churchRouter;
