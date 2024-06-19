import { AppDataSource } from "./database/data-source";

require("dotenv").config();

import Express from "express";
import Cors from "cors";

import userRouter from "./routes/user.routes";

import bodyParser from "body-parser";
import churchRouter from "./routes/church.routes";

import verifyToken from "./middlewares/tokenVerifyier.middleware";

const app = Express();
const PORT = process.env.PORT || 2000;

app.use(Cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRouter);
app.use(verifyToken);
app.use(churchRouter);

AppDataSource.initialize()
  .then(() =>
    app.listen(PORT, () => {
      console.log("Conectado - http://localhost:" + PORT);
    })
  )
  .catch((error) => console.log(error));
