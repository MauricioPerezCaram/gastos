function propsDishes(req, res, next) {
  const { name, price } = req.body;
  if (!name || !price) {
    const error = new Error(`El nombre y precio es requerido`);
    error.statusCode = 404;
    throw error;
  } else {
    return next();
  }
}

export default propsDishes;
