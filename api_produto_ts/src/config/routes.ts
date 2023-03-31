import { ItemController } from "./../controllers/item.controller";
import { Router } from "express";
import { ProdutoController } from "./../controllers/produto.controller";

const router: Router = Router();

//Produto
router.get("/produto", new ProdutoController().listar);
router.get("/produto/:id", new ProdutoController().buscar);
router.post("/produto", new ProdutoController().cadastrar);
router.delete("/produto/:id", new ProdutoController().deletar);
router.put("/produto", new ProdutoController().alterar);

//Carrinho
router.get("/item", new ItemController().listar);
router.get("/item/:id", new ItemController().buscar);
router.post(
  "/item/:idProduto/:quantidade/:idCarrinho?",
  new ItemController().cadastrar
);

export { router };
