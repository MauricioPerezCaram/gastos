export default (req, res, next) => {
  try {
    const { role } = req.session;
    if (role === 1) {
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
