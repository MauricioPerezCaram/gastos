import CustomRouter from "./customRouter.js";
import apiRouter from "./api/index.router.js";

export default class IndexRouter extends CustomRouter {
  init() {
    this.router.use("/api", apiRouter);
  }
}
