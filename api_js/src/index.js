const express = require('express');

const app = express();

app.use(express.json());

const produtos = [];

app.get("/", (request, response) => {
    return response.
        status(200).
        json({
            message: "ok",
            data: produtos
        });
});

app.post("/", (request, response) => {
    const produto = request.body;
    produtos.push(produto);
    return response.
        status(201).
        json({
            message: "Produto cadastrado!",
            data: produto
        });
});

app.listen(3000, () => {
    console.clear();
    console.log("Aplicação rodando na porta 3000")
});