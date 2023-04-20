import { ProdutoRepository } from "./../data/produto.repository";
import { Request, Response } from "express";
import { Produto } from "../models/produto.model";

const repository = new ProdutoRepository();

export class ProdutoController {
  async listar(request: Request, response: Response) {
    const produtos = await repository.listar();
    return response.status(200).json({
      message: "ok",
      data: produtos,
    });
  }

  async cadastrar(request: Request, response: Response) {
    let produto: Produto | null = request.body;

    produto = await repository.cadastrar(produto);

    return response.status(201).json({
      message: "Produto cadastrado!",
      data: produto,
    });
  }

  async buscar(request: Request, response: Response) {
    const id = Number.parseInt(request.params.id);

    const produto = await repository.buscar(id);

    if (!produto) {
      return response.status(404).json({ message: "Produto não encontrado" });
    }

    return response.status(200).json({
      message: "ok",
      data: produto,
    });
  }

  async deletar(request: Request, response: Response) {
    const id = Number.parseInt(request.params.id);
    let produto = await repository.deletar(id);

    if (!produto) {
      return response.status(404).json({ message: "Produto não encontrado" });
    }

    return response.status(200).json({
      message: "ok",
      data: produto,
    });
  }

  async alterar(request: Request, response: Response) {
    let produto: Produto | null = request.body;
    produto = await repository.alterar(produto);

    if (!produto) {
      return response.status(404).json({ message: "Produto não encontrado" });
    }

    return response.status(200).json({
      message: "Produto alterado",
      data: produto,
    });
  }
}
