function isValidPass(formPassword, dbPassword) {
  if (formPassword !== dbPassword) {
    const error = new Error("Contraseña o usuario incorrecto");
    error.statusCode = 401;
    throw error;
  }
}

export default isValidPass;
