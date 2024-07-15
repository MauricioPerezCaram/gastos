import { users } from "../dao/mongo/manager.mongo.js";

class UsersService {
  constructor() {
    this.model = users;
  }

  create = async (data) => {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  read = async ({ filter, options }) => {
    try {
      console.log(this.model);
      const response = await this.model.read({ filter, options });
      return response;
    } catch (error) {
      throw error;
    }
  };

  readOne = async (did) => {
    try {
      const response = await this.model.readOne(did);
      return response;
    } catch (error) {
      throw error;
    }
  };

  update = async (did, data) => {
    try {
      const response = await this.model.update(did, data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  destroy = async (did) => {
    try {
      const response = await this.model.destroy(did);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const service = new UsersService();
export default service;
