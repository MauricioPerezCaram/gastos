import CustomRouter from "../CustomRouter.js";
import { users } from "../../dao/mongo/manager.mongo.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import has8char from "../../middlewares/has8char.mid.js";

export default class UsersRouter extends CustomRouter {
  init() {
    this.create("/", has8char, async (req, res, next) => {
      try {
        const data = req.body;
        const response = await users.create(data);
        return res.json({
          statusCode: 201,
          response,
        });
      } catch (error) {
        return next(error);
      }
    });
    this.read("/", async (req, res, next) => {
      try {
        const all = await users.read({});
        return res.json({
          statusCode: 200,
          response: all,
        });
      } catch (error) {
        return next(error);
      }
    });
    this.read("/:uid", async (req, res, next) => {
      try {
        const { uid } = req.params;
        const one = await users.readOne(uid);
        return res.json({
          statusCode: 200,
          response: one,
        });
      } catch (error) {
        return next(error);
      }
    });
    this.update("/:uid", isAdmin, async (req, res, next) => {
      try {
        const { uid } = req.params;
        const data = req.body;
        const one = await users.update(uid, data);
        return res.json({
          statusCode: 200,
          response: one,
        });
      } catch (error) {
        return next(error);
      }
    });
    this.destroy("/:uid", isAdmin, async (req, res, next) => {
      try {
        const { uid } = req.params;
        const one = await users.destroy(uid);
        return res.json({
          statusCode: 200,
          response: one,
        });
      } catch (error) {
        return next(error);
      }
    });
  }
}
