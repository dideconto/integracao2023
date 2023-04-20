import { ItemController } from "./../controllers/item.controller";
import { Router } from "express";

const router: Router = Router();

//Carrinho
router.get("/item", new ItemController().listar);
router.get("/item/:id", new ItemController().buscar);
router.post(
  "/item/:idProduto/:quantidade/:idCarrinho?",
  new ItemController().cadastrar
);

export { router };
