import CustomRouter from "../CustomRouter.js";
import UsersRouter from "./users.router.js";
import DishesRouter from "./dishes.router.js";
import sesionssRouter from "./sessions.router.js";

const dish = new DishesRouter();
const user = new UsersRouter();

export default class ApiRouter extends CustomRouter {
  init() {
    this.router.use("/users", user.getRouter());
    this.router.use("/dishes", dish.getRouter());
    this.router.use("/sessions", sesionssRouter);
  }
}
