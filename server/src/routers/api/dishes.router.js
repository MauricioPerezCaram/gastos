import { Router } from "express";

const dishesRouter = Router();

dishesRouter.post("/", (req, res) => {});
dishesRouter.get("/", (req, res) => {});
dishesRouter.get("/:did", (req, res) => {});
dishesRouter.put("/:did", (req, res) => {});
dishesRouter.delete("/:did", (req, res) => {});

export default dishesRouter;
