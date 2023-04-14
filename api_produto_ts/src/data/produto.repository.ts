import { PrismaClient } from "@prisma/client";
import { Produto } from "../models/produto.model";

let produtos: Produto[] = [];

const prisma = new PrismaClient();

export class ProdutoRepository {
  async listar(): Promise<Produto[]> {
    return await prisma.produto.findMany();
  }

  async cadastrar(produto: Produto): Promise<Produto> {
    await prisma.produto.create({
      data: {
        nome: produto.nome,
        preco: produto.preco,
      },
    });
    return produto;
  }

  async buscar(id: number): Promise<Produto | null> {
    return await prisma.produto.findUnique({
      where: {
        id: id,
      },
    });
  }

  deletar(id: number): Produto[] {
    const index = produtos.findIndex((p) => p.id === id)!;
    if (index != -1) produtos.splice(index, 1);
    return produtos;
  }

  alterar(produto: Produto): Produto {
    const index = produtos.findIndex((p) => p.id === produto.id)!;
    produtos[index] = produto;
    return produto;
  }
}
