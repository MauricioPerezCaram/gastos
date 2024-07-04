import { Router } from "express";

const cookiesRouter = Router();

cookiesRouter.get("/set/:mode", async (req, res, next) => {
  try {
    const maxAge = 10000;
    const { mode } = req.params;
    return res.cookie("mode", mode, { maxAge }).json({
      statusCode: 200,
      message: "Cookie configurada - Modo: " + mode,
    });
  } catch (error) {
    return next(error);
  }
});

export default cookiesRouter;
