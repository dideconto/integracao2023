import { Request, Response } from "express";
import { Item } from "../models/item.model";
import { ItemRepository } from "../data/item.repository";
import crypto from "crypto";
import axios from "axios";

const repositoryItem = new ItemRepository();

export class ApiExternaController {
  async testar(request: Request, response: Response) {
    const { cep } = request.params;
    await axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((resposta) => {
        console.log(resposta.data.logradouro);
        // return response.status(200).json();
      });
  }
}
