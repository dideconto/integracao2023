import { Item } from "../models/item.model";

let itens: Item[] = [];

export class ItemRepository {
  listar(): Item[] {
    return itens;
  }

  cadastrar(item: Item): Item {
    itens.push(item);
    return item;
  }

  buscar(idCarrinho: string): Item[] {
    return itens.filter((p) => p.carrinhoId === idCarrinho)!;
  }
}
