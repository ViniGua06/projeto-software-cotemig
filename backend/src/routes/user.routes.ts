import { Router } from "express";

import UserController from "../controllers/user.controller";

const userRouter = Router();
const userController = new UserController();

import verifyToken from "../middlewares/tokenVerifyier.middleware";

userRouter.get("/getAll", userController.getAllUsers);
userRouter.get("/user/:id", userController.getUserById);
userRouter.post("/user", userController.createUser);
userRouter.post("/login", userController.loginUser);
userRouter.post("/sendEmail", userController.sendEmail);
userRouter.patch("/user/:id", verifyToken, userController.updateUser);
userRouter.patch("/forgotPassword", userController.forgotPassword);
userRouter.post("/testToken", verifyToken, userController.testToken);
userRouter.put("/password", userController.updatePassword);
userRouter.put("/photo", userController.changeProphilePhoto);

export default userRouter;
