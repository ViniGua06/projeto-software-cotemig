import { AppDataSource } from "./database/data-source";
require("dotenv").config();

import Express from "express";
import Cors from "cors";
import http from "http";
import { Server, Socket } from "socket.io";

import userRouter from "./routes/user.routes";
import churchRouter from "./routes/church.routes";
import verifyToken from "./middlewares/tokenVerifyier.middleware";
import { MessageRepository } from "./repositories/message.repository";
import { messageRouter } from "./routes/message.routes";
import UserRepository from "./repositories/user.repository";

const app = Express();
const server = http.createServer(app);

const PORT = process.env.PORT || 2000;

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-acess-token"],
};

app.use(Cors(corsOptions));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use(userRouter);
app.use(verifyToken);
app.use(churchRouter);
app.use(messageRouter);

AppDataSource.initialize()
  .then(() => {
    const io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      },
    });

    server.listen(PORT, () => {
      console.log(`Servidor Socket.io está ouvindo na porta ${PORT}`);
    });

    io.on("connection", (socket) => {
      socket.on("room", (id: number) => {
        socket.join(String(id));

        socket.emit("conectou", "CONECTOU A SALA " + id);
      });

      socket.on(
        "message",
        async ({ mensagem, user_id, church_id, user_name }) => {
          const data = Date.now();

          console.log("name", user_name);

          const messageRepo = new MessageRepository();

          await messageRepo.insertMessage({
            text: mensagem,
            church_id: church_id,
            user_id: user_id,
          });

          io.to(String(church_id)).emit("mess", {
            mensagem,
            data,
            user_id,
            user_name,
          });
        }
      );
    });
  })
  .catch((error) => {
    console.error("Error initializing AppDataSource:", error);
  });
