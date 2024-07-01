import { model, Schema } from "mongoose";

let collection = "dishes";
const schema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, default: "Sin especificar" },
  },
  { timestamps: true }
);

const Dish = model(collection, schema);
export default Dish;
