import "dotenv/config.js";
import express from "express";
import IndexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import morgan from "morgan";
import dbConnection from "./src/utils/db.js";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import MongoStore from "connect-mongo";

const server = express();
const PORT = process.env.PORT || 8080;
const ready = () => {
  console.log("Servidor andando en puerto " + PORT);
  dbConnection();
};
server.listen(PORT, ready);

server.use(cookieParser(process.env.SECRET));
server.use(
  expressSession({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      ttl: 7 * 24 * 60 * 60,
      mongoUrl: process.env.DB_LINK,
    }),
  })
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
const router = new IndexRouter();
server.use("/", router.getRouter());
server.use(errorHandler);
server.use(pathHandler);
