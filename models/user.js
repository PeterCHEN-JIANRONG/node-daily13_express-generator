const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "姓名未填寫"],
    },
    gender: {
      type: String,
      enum: ["man", "woman"],
      required: [true, "性別未填寫"],
    },
    age: {
      type: Number,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
  }
);

const User = new model("User", userSchema);

module.exports = User;
