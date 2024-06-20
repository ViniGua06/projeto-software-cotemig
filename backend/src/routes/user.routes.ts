import { Router } from "express";

import multer from "multer";

import UserController from "../controllers/user.controller";

const userRouter = Router();
const userController = new UserController();

import verifyToken from "../middlewares/tokenVerifyier.middleware";
import { storage } from "./multerConfig";

const upload = multer({ storage: storage });

userRouter.get("/getAll", userController.getAllUsers);
userRouter.get("/user/:id", userController.getUserById);
userRouter.post("/user", userController.createUser);
userRouter.post("/login", userController.loginUser);
userRouter.post("/sendEmail", userController.sendEmail);
userRouter.patch("/user/:id", verifyToken, userController.updateUser);
userRouter.patch("/forgotPassword", userController.forgotPassword);
userRouter.post("/testToken", verifyToken, userController.testToken);
userRouter.put("/password", userController.updatePassword);
userRouter.get("/photo/:id", userController.getUserProfilePhoto);
userRouter.put(
  "/photo/:id",
  upload.single("photo"),
  userController.changeProphilePhoto
);
userRouter.get("/churches/:id", userController.getChurchesByUser);
userRouter.post("/goToChurch/:id", userController.goToChurch);
userRouter.post("/enterchurch", userController.enterChurch);

export default userRouter;
