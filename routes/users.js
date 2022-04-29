var express = require("express");
var router = express.Router();
const { errorHandle, successHandle } = require("../services/httpHandle");
const User = require("../models/user");

/* GET users listing. */
router.get("/", async (req, res, next) => {
  const users = await User.find();
  successHandle(res, users);
});

// POST
router.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const { name, gender, age, avatar } = data;
    const user = await User.create({
      name,
      gender,
      age,
      avatar,
    });
    const users = await User.find();
    successHandle(res, users);
  } catch (err) {
    errorHandle(res, err);
  }
});

module.exports = router;
