import { PrismaClient } from "@prisma/client";
import { Produto } from "../models/produto.model";

let produtos: Produto[] = [];

const prisma = new PrismaClient();

export class ProdutoRepository {
  async listar(): Promise<Produto[]> {
    return await prisma.produto.findMany();
  }

  async cadastrar(produto: Produto | null): Promise<Produto> {
    await prisma.produto.create({
      data: {
        nome: produto!.nome,
        preco: produto!.preco,
      },
    });
    return produto!;
  }

  async buscar(id: number): Promise<Produto | null> {
    return await prisma.produto.findUnique({
      where: {
        id: id,
      },
    });
  }

  async deletar(idProduto: number): Promise<Produto | null> {
    try {
      const produto = await prisma.produto.delete({
        where: {
          id: idProduto,
        },
      });
      return produto;
    } catch {
      return null;
    }
  }

  async alterar(produto: Produto | null): Promise<Produto | null> {
    try {
      const produtoAlterado = await prisma.produto.update({
        where: {
          id: produto?.id,
        },
        data: {
          nome: produto?.nome,
          preco: produto?.preco,
        },
      });
      return produto;
    } catch {
      return null;
    }
  }
}
