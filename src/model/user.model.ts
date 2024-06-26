import mongoose, { Schema } from "mongoose";

const userModel = new Schema({
  fullName: {
    type: String,
    required: [true, "fullname is required"],
  },
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
});

export const USER = mongoose.models.User || mongoose.model("User", userModel);
