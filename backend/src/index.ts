import { AppDataSource } from "./database/data-source";
require("dotenv").config();

import Express from "express";
import Cors from "cors";
import http from "http";
import { Server, Socket } from "socket.io";

import userRouter from "./routes/user.routes";
import churchRouter from "./routes/church.routes";
import verifyToken from "./middlewares/tokenVerifyier.middleware";

const app = Express();
const server = http.createServer(app);

const PORT = process.env.PORT || 2000;

app.use(Cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use(userRouter);
app.use(churchRouter);

AppDataSource.initialize()
  .then(() => {
    const io = new Server(server, {
      cors: {
        origin: "*", // Permitir solicitações de qualquer origem
        methods: ["GET", "POST"], // Métodos permitidos
        allowedHeaders: ["my-custom-header"], // Cabeçalhos personalizados permitidos
        credentials: true, // Permitir credenciais (cookies, cabeçalhos de autorização, etc.)
      },
    });

    server.listen(PORT, () => {
      console.log(`Servidor Socket.io está ouvindo na porta ${PORT}`);
    });

    io.on("connection", (socket) => {
      console.log(`Novo cliente conectado - ID: ${socket.id}`);

      socket.on("room", (id: number) => {
        socket.join(String(id));

        socket.emit("conectou", "CONECTOU A SALA " + id);
      });

      socket.on("message", ({ mensagem, user_id, church_id }) => {
        console.log("Mensagem recebida: " + mensagem, user_id, church_id);

        const data = Date.now();

        io.to(String(church_id)).emit("mess", { mensagem, data, user_id });
      });
    });
  })
  .catch((error) => {
    console.error("Error initializing AppDataSource:", error);
  });
