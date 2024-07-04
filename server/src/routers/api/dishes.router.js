import { Router } from "express";
import { dishes } from "../../dao/mongo/manager.mongo.js";

const dishesRouter = Router();

dishesRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const response = await dishes.create(data);
    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});
dishesRouter.get("/", async (req, res, next) => {
  try {
    const all = await dishes.read({});
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});
dishesRouter.get("/:did", async (req, res, next) => {
  try {
    const { did } = req.params;
    const one = await dishes.readOne(did);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});
dishesRouter.put("/:did", async (req, res, next) => {
  try {
    const { did } = req.params;
    const data = req.body;
    const one = await dishes.update(did, data);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});
dishesRouter.delete("/:did", async (req, res, next) => {
  try {
    const { did } = req.params;
    const one = await dishes.destroy(did);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

export default dishesRouter;
