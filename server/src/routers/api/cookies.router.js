import { Router } from "express";

const cookiesRouter = Router();

cookiesRouter.get("/set/:mode", async (req, res, next) => {
  try {
    const { mode } = req.params;
    const maxAge = 10000;
    const signed = true;
    return res
      .cookie("mode", mode, { maxAge })
      .cookie("sessionId", "hola1234", { maxAge, signed })
      .json({
        statusCode: 200,
        message: "Cookie configurada - Modo: " + mode,
      });
  } catch (error) {
    return next(error);
  }
});

export default cookiesRouter;
