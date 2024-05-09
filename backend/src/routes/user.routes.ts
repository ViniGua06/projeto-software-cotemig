import { Router } from "express";

import UserController from "../controllers/user.controller";

const userRouter = Router();
const userController = new UserController();

import verifyToken from "../middlewares/tokenVerifyier.middleware";

userRouter.get("/user/:id", userController.getUserById);
userRouter.post("/user", userController.createUser);
userRouter.post("/sendEmail", userController.sendEmail);
userRouter.patch("/user/:id", verifyToken, userController.updateUser);
userRouter.patch("/forgotPassword", userController.forgotPassword);
userRouter.post("/testToken", verifyToken, userController.testToken);
userRouter.put("/password", userController.updatePassword);

export default userRouter;
