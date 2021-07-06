const express = require("express"); // importando o express

const server = express(); // criando uma variável para chamada do server

server.get("/teste", () => {
  console.log("teste");
}); // Cria a rota /teste com o método GET, o console.log retornará no terminal ‘teste’ caso tenha executado com sucesso.

server.listen(3000); // o servidor será executado na porta 3000
