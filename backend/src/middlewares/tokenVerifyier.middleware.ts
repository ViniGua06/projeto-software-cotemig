import { Request, Response, NextFunction } from "express";

import Jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["x-acess-token"];

  if (!token) {
    return res.status(403).json({ message: "Token faltando" });
  }

  Jwt.verify(token as string, "Senha_segura", (error) => {
    if (error) {
      console.log(error);
      return res
        .status(403)
        .json({ message: "Permissão negada", error: error });
    }

    return next();
  });
};

export default verifyToken;
