import CustomRouter from "../CustomRouter.js";
import { dishes } from "../../dao/mongo/manager.mongo.js";
import propsDishes from "../../middlewares/propsDishes.mid.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import passport from "../../middlewares/passport.mid.js";

export default class DishesRouter extends CustomRouter {
  init() {
    this.create(
      "/",
      passport.authenticate("jwt", { session: false }),
      isAdmin,
      propsDishes,
      async (req, res, next) => {
        try {
          const data = req.body;
          const response = await dishes.create(data);
          return res.success201(response);
        } catch (error) {
          return next(error);
        }
      }
    );

    this.read("/", async (req, res, next) => {
      try {
        const all = await dishes.read({});
        return res.success200(all);
      } catch (error) {
        return next(error);
      }
    });
    this.read("/:did", async (req, res, next) => {
      try {
        const { did } = req.params;
        const one = await dishes.readOne(did);
        return res.success200(one);
      } catch (error) {
        return next(error);
      }
    });
    this.update("/:did", isAdmin, async (req, res, next) => {
      try {
        const { did } = req.params;
        const data = req.body;
        const one = await dishes.update(did, data);
        return res.success200(one);
      } catch (error) {
        return next(error);
      }
    });
    this.destroy("/:did", isAdmin, async (req, res, next) => {
      try {
        const { did } = req.params;
        const one = await dishes.destroy(did);
        return res.success200("Eliminado el plato: " + one.name);
      } catch (error) {
        return next(error);
      }
    });
  }
}
