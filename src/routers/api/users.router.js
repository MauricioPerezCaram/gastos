import CustomRouter from "../CustomRouter.js";
import { users } from "../../dao/mongo/manager.mongo.js";
import has8char from "../../middlewares/has8char.mid.js";
import {
  create,
  read,
  readOne,
  update,
  destroy,
} from "../../controllers/users.controller.js";

export default class UsersRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN", "PREM"], has8char, create);

    this.read("/", ["PUBLIC"], read);

    this.read("/:uid", ["PUBLIC"], readOne);

    this.update("/:uid", ["ADMIN", "PREM"], update);

    this.destroy("/:uid", ["ADMIN", "PREM"], destroy);
  }
}
