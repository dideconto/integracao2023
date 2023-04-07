import { ProdutoRepository } from "./../data/produto.repository";
import { Request, Response } from "express";
import { Produto } from "../models/produto.model";

const repository = new ProdutoRepository();

export class ProdutoController {
  listar(request: Request, response: Response) {
    const produtos = repository.listar();
    return response.status(200).json({
      message: "ok",
      data: produtos,
    });
  }

  cadastrar(request: Request, response: Response) {
    let produto: Produto = request.body;

    produto = repository.cadastrar(produto);

    return response.status(201).json({
      message: "Produto cadastrado!",
      data: produto,
    });
  }

  async buscar(request: Request, response: Response) {
    const id = Number.parseInt(request.params.id);

    let tempo = Math.random() * 1000;
    console.log(tempo);
    await new Promise((resolve) => {
      setTimeout(() => {
        const produto: Produto = repository.buscar(id);
        console.log(produto);
        if (!produto) {
          return response
            .status(404)
            .json({ message: "Produto não encontrado" });
        }

        return response.status(200).json({
          message: "ok",
          data: produto,
        });
      }, tempo);
    });
  }

  deletar(request: Request, response: Response) {
    const id = Number.parseInt(request.params.id);
    let produtos = repository.deletar(id);
    return response.status(200).json({
      message: "ok",
      data: produtos,
    });
  }

  alterar(request: Request, response: Response) {
    let produto: Produto = request.body;
    produto = repository.alterar(produto);

    return response.status(200).json({
      message: "ok",
      data: produto,
    });
  }
}
