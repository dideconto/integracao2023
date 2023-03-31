import express from "express";
import { router } from "./config/routes";

const app = express();

app.use(express.json());
app.use(router);

app.listen(3001, () => {
  console.clear();
  console.log("Aplicação de itens rodando na porta 3001");
});
