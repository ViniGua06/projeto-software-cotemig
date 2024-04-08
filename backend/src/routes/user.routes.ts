import { Router } from "express";

import UserController from "../controllers/user.controller";

const userRouter = Router();
const userController = new UserController();

userRouter.get("/user/:id", userController.getUserById);

userRouter.post("/user", userController.createUser);

export default userRouter;
