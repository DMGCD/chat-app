import mongoose from "mongoose";

const UserModel = mongoose.Schema({
    username: { type: String, required: true, unique: true }
})

const User = mongoose.model("User", UserModel);

module.exports = User;