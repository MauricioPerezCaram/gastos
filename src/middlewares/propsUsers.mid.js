function propsUsers(req, res, next) {
  const { name, role } = req.body;
  if (!name || !role) {
    const error = new Error(`El nombre y rol es requerido`);
    error.statusCode = 404;
    throw error;
  } else {
    return next();
  }
}

export default propsUsers;
