import { Folha } from "./../models/folha.model";

let folhasCadastradas: Folha[] = [];

export class FolhaRepository {
  listar(): Folha[] {
    return folhasCadastradas;
  }

  cadastrar(folhas: Folha[]): Folha[] {
    folhasCadastradas = folhasCadastradas.concat(folhas);
    return folhas;
  }
}
