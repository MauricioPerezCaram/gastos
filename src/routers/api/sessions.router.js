import { Router } from "express";
// import { users } from "../../dao/mongo/manager.mongo.js";
import has8char from "../../middlewares/has8char.mid.js";
// import isValidPass from "../../middlewares/isValidPass.mid.js";
import passport from "../../middlewares/passport.mid.js";

const sessionsRouter = Router();

//register
sessionsRouter.post(
  "/register",
  has8char,
  // passCallBack("register"),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 201,
        message: "Registered!",
      });
    } catch (error) {
      return next(error);
    }
  }
);

//login
sessionsRouter.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/sessions/datosincorrectos",
  }),
  async (req, res, next) => {
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
  }
);

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

// //me
// sessionsRouter.post(
//   "/me",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res, next) => {
//     try {
//       if (req.user && req.user.email) {
//         return res.json({
//           statusCode: 200,
//           message: `Session with email: ${req.user.email}`,
//         });
//       } else {
//         const error = new Error("No estas en una sesión");
//         error.statusCode = 400;
//         throw error;
//       }
//     } catch (error) {
//       return next(error);
//     }
//   }
// );

//signout
sessionsRouter.post(
  "/signout",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/api/sessions/signout/cb",
  }),
  async (req, res, next) => {
    try {
      return res.clearCookie("token").json({
        statusCode: 200,
        message: "Cerraste sesión",
      });
    } catch (error) {
      return next(error);
    }
  }
);

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
