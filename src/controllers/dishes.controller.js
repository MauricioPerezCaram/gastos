import service from "../services/dishes.service.js";

class DishesController {
  constructor() {
    this.service = service;
  }

  create = async (req, res, next) => {
    try {
      const data = req.body;
      const response = await this.service.create(data);
      return res.success201(response);
    } catch (error) {
      return next(error);
    }
  };

  read = async (req, res, next) => {
    try {
      const all = await this.service.read({});
      return res.success200(all);
    } catch (error) {
      return next(error);
    }
  };

  readOne = async (req, res, next) => {
    try {
      const { did } = req.params;
      const one = await this.service.readOne(did);
      return res.success200(one);
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { did } = req.params;
      const data = req.body;
      const one = await this.service.update(did, data);
      return res.success200(one);
    } catch (error) {
      return next(error);
    }
  };
  destroy = async (req, res, next) => {
    try {
      const { did } = req.params;
      const one = await this.service.destroy(did);
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
