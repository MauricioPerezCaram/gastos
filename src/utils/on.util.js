process.on("exit", (code) =>
  console.log("El proceso terminó con código " + code)
);

process.on("uncaughtException", (error) =>
  console.log("Ha ocurrido un error: " + error.message)
);

console.log(process.pid);
process.pid();
process.exit(1);
