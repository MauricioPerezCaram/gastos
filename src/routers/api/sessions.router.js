import { Router } from "express";
import has8char from "../../middlewares/has8char.mid.js";
import passport from "../../middlewares/passport.mid.js";
import passCallback from "../../middlewares/passCallback.mid.js";

const sessionsRouter = Router();

//register
sessionsRouter.post(
  "/register",
  has8char,

  passCallback("register"),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 201,
        message: "Usuario registrado exitosamente",
      });
    } catch (error) {
      return next(error);
    }
  }
);

//login
sessionsRouter.post("/login", passCallback("login"), async (req, res, next) => {
  try {
    return res
      .cookie("token", req.token, {
        maxAge: 7 * 24 * 60 * 60,
        httpOnly: true,
      })
      .json({
        statusCode: 200,
        message: "Iniciaste sesión correctamente",
      });
  } catch (error) {
    return next(error);
  }
});

//google
sessionsRouter.post(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

//google
sessionsRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Iniciaste sesión con google",
        session: req.session,
      });
    } catch (error) {
      return next(error);
    }
  }
);

//me
sessionsRouter.post("/me", passCallback("jwt"), async (req, res, next) => {
  try {
    const user = {
      email: req.user.email,
      role: req.user.role,
    };
    return res.json({
      statusCode: 200,
      response: user,
    });
  } catch (error) {
    return next(error);
  }
});

//signout
sessionsRouter.post("/signout", passCallback("jwt"), async (req, res, next) => {
  try {
    return res.clearCookie("token").json({
      statusCode: 200,
      message: "Cerraste sesión",
    });
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.get("/badauth", (req, res, next) => {
  try {
    return res.json({
      statusCode: 401,
      message: "Bad auth",
    });
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.get("/emailutilizado", (req, res, next) => {
  try {
    return res.json({
      statusCode: 401,
      message: "Correo electronico ya utilizado",
    });
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.get("/datosincorrectos", (req, res, next) => {
  try {
    return res.json({
      statusCode: 401,
      message: "Email o contraseña incorrecta",
    });
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.get("/signout/cb", (req, res, next) => {
  try {
    return res.json({
      statusCode: 401,
      message: "No estas en una sesión",
    });
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
