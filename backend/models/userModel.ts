import { NextFunction } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema<UserInterface>({
  first_name: {
    type: String,
    required: [true, "The first name field is required "],
  },
  last_name: {
    type: String,
    required: [true, "The last name field is required."],
  },
  email: {
    type: String,
    required: [true, "The email field is required."],
    unique: true,
  },
  age: {
    type: Number,
    required: [true, "The age field is required."],
  },
  image: String,
  description: String,
  password: {
    type: String,
    required: [true, "The password field is required."],
    select: false,
  },
});

//Deletes versionKey and transforms _id into id
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

userSchema.pre("save", async function (next: NextFunction) {
  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password || "", 12);
  next();
});

userSchema.methods.compareCorrectPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  console.log(candidatePassword, userPassword);
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
