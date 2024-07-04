import { model, Schema } from "mongoose";

let collection = "users";
const schema = new Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = model(collection, schema);
export default User;
