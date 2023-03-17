import { Request, Response } from "express";
import { Produto } from "../models/produto.model";

const produtos: Produto[] = [];

export class ProdutoController {
  list(request: Request, response: Response) {
    return response.status(200).json({
      message: "ok",
      data: produtos,
    });
  }

  create(request: Request, response: Response) {
    const produto: Produto = request.body;
    produtos.push(produto);
    return response.status(201).json({
      message: "Produto cadastrado!",
      data: produto,
    });
  }

  find(request: Request, response: Response) {
    const { nome } = request.params;

    const produto: Produto = produtos.find((p) => p.nome == nome)!;

    return response.status(200).json({
      message: "ok",
      data: produto,
    });
  }
  delete() {}
  update() {}
}
