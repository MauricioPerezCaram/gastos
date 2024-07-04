function notFoundOne(one) {
  if (!one) {
    const error = new Error("No hay documento con ese ID");
    error.statusCode = 404;
    throw error;
  }
  return one;
}

export default notFoundOne;
