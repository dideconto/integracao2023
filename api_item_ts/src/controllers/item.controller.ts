import { Request, Response } from "express";
import { Item } from "../models/item.model";
import { ItemRepository } from "../data/item.repository";
import crypto from "crypto";
import axios from "axios";

const repositoryItem = new ItemRepository();

export class ItemController {
  listar(request: Request, response: Response) {
    const itens = repositoryItem.listar();
    return response.status(200).json({
      message: "ok",
      data: itens,
    });
  }

  async cadastrar(request: Request, response: Response) {
    let { idProduto, quantidade, idCarrinho } = request.params;

    let item: Item = {};

    await axios
      .get(`http://localhost:3000/produto/${idProduto}`)
      .then((resposta) => {
        item = {
          produto: resposta.data.data,
          quantidade: Number.parseInt(quantidade),
          carrinhoId: idCarrinho,
        };

        if (!idCarrinho) {
          item.carrinhoId = crypto.randomUUID();
        }

        item = repositoryItem.cadastrar(item);

        return response.status(201).json({
          message: "Produto adicionado ao carrinho!",
          data: item,
        });
      })
      .catch((erro) => {
        return response.status(404).json({
          message: erro.response.data.message,
        });
      });
  }

  buscar(request: Request, response: Response) {
    const { id } = request.params;

    const itens = repositoryItem.buscar(id);

    return response.status(200).json({
      message: "ok",
      data: itens,
    });
  }
}
