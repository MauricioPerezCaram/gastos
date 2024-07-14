import CustomRouter from "../CustomRouter.js";
import { users } from "../../dao/mongo/manager.mongo.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import has8char from "../../middlewares/has8char.mid.js";

export default class UsersRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN", "PREM"], has8char, async (req, res, next) => {
      try {
        const data = req.body;
        const response = await users.create(data);
        return res.success201(response);
      } catch (error) {
        return next(error);
      }
    });
    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const all = await users.read({});
        return res.success200(all);
      } catch (error) {
        return next(error);
      }
    });
    this.read("/:uid", ["PUBLIC"], async (req, res, next) => {
      try {
        const { uid } = req.params;
        const one = await users.readOne(uid);
        return res.success200(one);
      } catch (error) {
        return next(error);
      }
    });
    this.update("/:uid", ["ADMIN", "PREM"], isAdmin, async (req, res, next) => {
      try {
        const { uid } = req.params;
        const data = req.body;
        const one = await users.update(uid, data);
        return res.success200(one);
      } catch (error) {
        return next(error);
      }
    });
    this.destroy(
      "/:uid",
      ["ADMIN", "PREM"],
      isAdmin,
      async (req, res, next) => {
        try {
          const { uid } = req.params;
          const one = await users.destroy(uid);
          return res.success200("Eliminado el usuario: " + one.name);
        } catch (error) {
          return next(error);
        }
      }
    );
  }
}
