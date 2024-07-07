import { model, Schema } from "mongoose";

let collection = "dishes";
const schema = new Schema(
  {
    name: { type: String, required: true, unique: true, index: true },
    category: {
      type: String,
      enum: ["bebida", "entrada", "principal", "postre"],
    },
    price: { type: Number, required: true, index: true },
    photo: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.clarin.com%2Finternacional%2Fcomida-rapida-calorias-estudios_0_0VMr3dsiC0.html&psig=AOvVaw11ppDygvgIXijYYO03hZ3M&ust=1720192028693000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKi6pOnUjYcDFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true }
);

const Dish = model(collection, schema);
export default Dish;
