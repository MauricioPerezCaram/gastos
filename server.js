import express from "express";

const server = express();

const PORT = 8080;

const cbReady = () => console.log("Servidor listo en puerto " + PORT);

server.listen(PORT, cbReady);
