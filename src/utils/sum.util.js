function sum() {
  let counter = 0;
  for (let index = 0; index < 5e9; index++) {
    counter++;
  }
  return counter;
}

process.on("message", () => {
  const result = sum();
  process.send(result);
});
