// import { fork } from "child_process";
import CustomRouter from "../CustomRouter.js";
import UsersRouter from "./users.router.js";
import DishesRouter from "./dishes.router.js";
import sesionssRouter from "./sessions.router.js";

const dish = new DishesRouter();
const user = new UsersRouter();

export default class ApiRouter extends CustomRouter {
  init() {
    this.use("/users", user.getRouter());
    this.use("/dishes", dish.getRouter());
    this.use("/sessions", sesionssRouter);
    // this.read("/sum", ["PUBLIC"], async (req, res) => {
    //   try {
    //     const child = fork("./src/utils/sum.util.js");
    //     child.send("start");
    //     child.on("message", (result) => res.success200(result));
    //   } catch (error) {
    //     return next(error);
    //   }
    // });
  }
}
