import { Produto } from "./produto.model";

export interface Item {
  produto: Produto;
  quantidade: number;
  carrinhoId: string;
}
