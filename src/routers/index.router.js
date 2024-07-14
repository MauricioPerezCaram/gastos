import CustomRouter from "./CustomRouter.js";
import ApiRouter from "./api/index.router.api.js";

const api = new ApiRouter();
const apiRouter = api.getRouter();

export default class IndexRouter extends CustomRouter {
  init() {
    this.router.use("/api", apiRouter);
  }
}
