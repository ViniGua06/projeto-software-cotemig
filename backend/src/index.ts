import { AppDataSource } from "./database/data-source";

import Express from "express";
import Cors from "cors";

import userRouter from "./routes/user.routes";

import bodyParser from "body-parser";

const app = Express();
const PORT = process.env.PORT || 4000;

app.use(Cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRouter);

AppDataSource.initialize()
  .then(() =>
    app.listen(PORT, () => {
      console.log("Conectado");
    })
  )
  .catch((error) => console.log(error));
