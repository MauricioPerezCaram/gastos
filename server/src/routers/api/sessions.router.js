import { Router } from "express";

const sesionssRouter = Router();

sesionssRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email && password === "hola1234") {
      req.session.email = email;
      req.session.role = "admin";
      return res.json({
        statusCode: 200,
        message: "Inicion Sesiada",
        session: req.session,
      });
    }
    const error = new Error("Error de autenticación");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    return next(error);
  }
});

sesionssRouter.post("/me", async (req, res, next) => {
  try {
    if (req.session.email) {
      return res.json({
        statusCode: 200,
        message: "Iniciaste sesión con el email " + req.session.email,
      });
    } else {
      const error = new Error("No estas en una sesión");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

sesionssRouter.post("/signout", async (req, res, next) => {
  try {
    if (req.session.email) {
      req.session.destroy();
      return res.json({
        statusCode: 200,
        message: "Has cerrado sesión correctamente",
      });
    } else {
      const error = new Error("No estas en una sesión");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

export default sesionssRouter;
