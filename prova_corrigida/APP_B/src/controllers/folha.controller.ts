import { Request, Response } from "express";
import { FolhaRepository } from "../data/folha.repository";
import { Folha } from "../models/folha.model";

const repository = new FolhaRepository();

export class FolhaController {
  listar(request: Request, response: Response) {
    const folhas = repository.listar();
    return response.status(200).json({
      message: "ok",
      data: folhas,
    });
  }

  async cadastrar(request: Request, response: Response) {
    let folhas: Folha[] = request.body;
    folhas = repository.cadastrar(folhas);
    response.status(201).json({ message: "Folhas Cadastradas!", data: folhas });
  }
}
