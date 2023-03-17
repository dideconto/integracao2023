import { Router } from "express";
import { ProdutoController } from "./../controllers/produto.controller";

const router: Router = Router();

//Produto
router.get("/", new ProdutoController().list);
router.get("/:nome", new ProdutoController().find);
router.post("/", new ProdutoController().create);
router.delete("/", new ProdutoController().delete);
router.put("/", new ProdutoController().update);

export { router };
