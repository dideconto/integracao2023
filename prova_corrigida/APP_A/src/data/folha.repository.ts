import { PrismaClient } from "@prisma/client";
import { Folha } from "./../models/folha.model";

const prisma = new PrismaClient();

export class FolhaRepository {
  async listar(): Promise<Folha[]> {
    return await prisma.folha.findMany({
      where: {
        calculado: false,
      },
    });
  }

  async cadastrar(folha: Folha): Promise<Folha> {
    const folhaCadastrado = prisma.folha.create({
      data: {
        funcionario: folha.funcionario,
        cpf: folha.cpf,
        horas: folha.horas,
        valor: folha.valor,
        calculado: false,
      },
    });
    return folhaCadastrado;
  }

  async atualizar(folhas: Folha[]): Promise<Folha[]> {
    const folhasAtualizadas: Folha[] = [];
    for (let folha of folhas) {
      const folhaAtualizada = prisma.folha.update({
        where: {
          id: folha.id,
        },
        data: {
          bruto: folha.bruto,
          irrf: folha.irrf,
          inss: folha.inss,
          fgts: folha.fgts,
          liquido: folha.liquido,
          calculado: true,
        },
      });
      folhasAtualizadas.push({
        id: (await folhaAtualizada).id,
        funcionario: (await folhaAtualizada).funcionario,
        cpf: (await folhaAtualizada).cpf,
        valor: (await folhaAtualizada).valor,
        horas: (await folhaAtualizada).horas,
        bruto: (await folhaAtualizada).bruto,
        irrf: (await folhaAtualizada).irrf,
        fgts: (await folhaAtualizada).fgts,
        inss: (await folhaAtualizada).inss,
        liquido: (await folhaAtualizada).liquido,
        calculado: (await folhaAtualizada).calculado,
      });
    }
    return folhasAtualizadas;
  }
}
