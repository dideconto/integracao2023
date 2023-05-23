import { Request, Response } from "express";
import { FolhaRepository } from "../data/folha.repository";
import { Folha } from "../models/folha.model";
import axios from "axios";
import { Calculos } from "../utils/calculos";

const repository = new FolhaRepository();

export class FolhaController {
  async listar(request: Request, response: Response) {
    const folhas = await repository.listar();
    return response.status(200).json({
      message: "ok",
      data: folhas,
    });
  }

  async cadastrar(request: Request, response: Response) {
    let folha: Folha = request.body;
    folha = await repository.cadastrar(folha);
    return response.status(201).json({
      message: "Produto cadastrado!",
      data: folha,
    });
  }

  async calcular(request: Request, response: Response) {
    let folhas = await repository.listar();
    let calculos = new Calculos();
    folhas.map((folha) => {
      folha.bruto = calculos.calcularBruto(folha.horas, folha.valor);
      folha.inss = calculos.calcularINSS(folha.bruto);
      folha.irrf = calculos.calcularIRRF(folha.bruto);
      folha.fgts = calculos.calcularFGTS(folha.bruto);
      folha.liquido = calculos.calcularLiquido(
        folha.bruto,
        folha.inss,
        folha.irrf
      );
      folha.calculado = true;
    });
    folhas = await repository.atualizar(folhas);
    await axios
      .post(`http://localhost:3001/folha/cadastrar`, folhas)
      .then((resposta) => {
        return response.status(201).json({
          message: "Folhas cadastradas!",
          data: folhas,
        });
      })
      .catch((erro) => {
        return response.status(400).json({
          message: erro,
        });
      });
  }
}
