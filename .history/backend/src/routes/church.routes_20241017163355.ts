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
churchRouter.patch(
  "/notice/setaware/:notice_id/:user_id",
  churchController.setAwareNumber
);
churchRouter.get(
  "/notice/checkaware/:notice_id/:user_id",
  churchController.checkIfIsAlreadyAware
);
churchRouter.post("/events/create", churchController.createEvent);
churchRouter.post("/eventsbychurches", churchController.getEventsByChurches);
churchRouter.get("/events", churchController.getEvents);

churchRouter.get("/church/:church_id/verse", churchController.getDailyVerse);
churchRouter.post(
  "/church/:church_id/setverse",
  churchController.setDailyVerse
);

churchRouter.post("/invite", churchController.invitePerson);

export default churchRouter;
