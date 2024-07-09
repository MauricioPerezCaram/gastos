import { Router } from "express";
import { users } from "../../dao/mongo/manager.mongo.js";
import has8char from "../../middlewares/has8char.mid.js";
// import isValidPass from "../../middlewares/isValidPass.mid.js";
import passport from "../../middlewares/passport.mid.js";

const sesionssRouter = Router();

sesionssRouter.post(
  "/register",
  has8char,
  passport.authenticate("register", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 201,
        message: "Usuario registrado correctamente",
      });
    } catch (error) {
      return next(error);
    }
  }
);

sesionssRouter.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Inicion Sesiada",
        session: req.session,
      });
    } catch (error) {
      return next(error);
    }
  }
);

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

sesionssRouter.get("/badauth", async (req, res, next) => {
  try {
    return res.json({
      statusCode: 401,
      message: "Error de autenticación",
    });
  } catch (error) {
    return next(error);
  }
});

export default sesionssRouter;
