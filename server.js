const http = require("http");

const server = http.createServer();

const PORT = 8080;

const cbReady = () => console.log("Servidor listo en puerto " + PORT);

server.listen(PORT, cbReady);
