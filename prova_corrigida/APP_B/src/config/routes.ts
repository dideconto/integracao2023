import { Router } from "express";
import { FolhaController } from "../controllers/folha.controller";

const router: Router = Router();

//Folha
router.get("/folha/listar", new FolhaController().listar);
router.post("/folha/cadastrar", new FolhaController().cadastrar);

export { router };
