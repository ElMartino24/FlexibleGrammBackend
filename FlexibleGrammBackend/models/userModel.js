import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  vorname: {
    type: String,
    required: true,
  },
  nachname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;