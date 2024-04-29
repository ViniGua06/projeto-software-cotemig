import { Router } from "express";

import UserController from "../controllers/user.controller";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/user/:id", userController.getUserById);
userRouter.post("/user", userController.createUser);
userRouter.post("/sendEmail", userController.sendEmail);
userRouter.patch("/user/:id", userController.updateUser);

export default userRouter;
