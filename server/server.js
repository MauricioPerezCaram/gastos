import "dotenv/config.js";

import express from "express";
import router from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import morgan from "morgan";
import dbConnection from "./src/utils/db.js";
import cookieParser from "cookie-parser";
import expressSession from "express-session";

const server = express();
const PORT = process.env.PORT || 8080;
const ready = () => {
  console.log("Servidor andando en puerto " + PORT);
  dbConnection();
};
server.listen(PORT, ready);

//middlewares
server.use(cookieParser(process.env.SECRET_KEY));
server.use(
  expressSession({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 6000 },
  })
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
