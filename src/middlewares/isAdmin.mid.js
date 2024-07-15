import { verifytoken } from "../utils/token.util.js";

export default (req, res, next) => {
  try {
    const token = req.cookies.token;
    const userData = verifytoken(token);
    const { role } = userData;
    if (role === 1 || role === 2) {
      return next();
    } else {
      const error = new Error("Debes ser administrador");
      error.statusCode = 403;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
