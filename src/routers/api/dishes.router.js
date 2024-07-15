import CustomRouter from "../CustomRouter.js";
import propsDishes from "../../middlewares/propsDishes.mid.js";
import passport from "../../middlewares/passport.mid.js";
import {
  create,
  read,
  readOne,
  update,
  destroy,
} from "../../controllers/dishes.controller.js";

export default class DishesRouter extends CustomRouter {
  init() {
    this.create(
      "/",
      ["ADMIN", "PREM"],
      passport.authenticate("jwt", { session: false }),
      propsDishes,
      create
    );

    this.read("/", ["PUBLIC"], read);

    this.read("/:did", ["PUBLIC"], readOne);

    this.update("/:did", ["ADMIN", "PREM"], update);

    this.destroy("/:did", ["ADMIN", "PREM"], destroy);
  }
}
