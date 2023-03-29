import { Router } from "express";
import { ProdutoController } from "./../controllers/produto.controller";

const router: Router = Router();

//Produto
router.get("/", new ProdutoController().listar);
router.get("/:id", new ProdutoController().buscar);
router.post("/", new ProdutoController().cadastrar);
router.delete("/:id", new ProdutoController().deletar);
router.put("/", new ProdutoController().alterar);

export { router };
