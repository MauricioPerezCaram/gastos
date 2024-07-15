// import service from "../services/events.service.js";
import { dishes } from "../dao/mongo/manager.mongo.js";

class DishesController {
  //   constructor() {
  //     this.service = service;
  //   }

  constructor() {
    this.model = dishes;
  }

  create = async (req, res, next) => {
    try {
      const data = req.body;
      const response = await this.model.create(data);
      return res.success201(response);
    } catch (error) {
      return next(error);
    }
  };

  read = async (req, res, next) => {
    try {
      const all = await this.model.read({});
      return res.success200(all);
    } catch (error) {
      return next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { did } = req.params;
      const one = await this.model.readOne(did);
      return res.success200(one);
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { did } = req.params;
      const data = req.body;
      const one = await this.model.update(did, data);
      return res.success200(one);
    } catch (error) {
      return next(error);
    }
  };
  destroy = async (req, res, next) => {
    try {
      const { did } = req.params;
      const one = await this.model.destroy(did);
      return res.success200("Eliminado el plato: " + one.name);
    } catch (error) {
      return next(error);
    }
  };
}

export default DishesController;
const controller = new DishesController();
const { create, read, readOne, update, destroy } = controller;
export { create, read, readOne, update, destroy };
