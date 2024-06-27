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
  avatar: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verication token is required"],
  },
  verificationTokenExpirey: {
    type: String,
    required: [true, "Verication token expirey is required"],
  },
});

export const USER = mongoose.models.User || mongoose.model("User", userModel);
