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
    if (name === undefined) {
      errorHandle(res, "姓名未填寫");
    } else if (gender === undefined) {
      errorHandle(res, "性別未填寫");
    } else {
      const newUser = await User.create({
        name,
        gender,
        age,
        avatar,
      });
      successHandle(res, newUser);
    }
  } catch (err) {
    errorHandle(res, err);
  }
});

// DELETE ALL
router.delete("/", async (req, res, next) => {
  await User.deleteMany({});
  const users = await User.find();
  successHandle(res, users);
});

// DELETE by Id
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (user !== null) {
      const users = await User.find();
      successHandle(res, users);
    } else {
      errorHandle(res, "查無此 ID");
    }
  } catch (err) {
    errorHandle(res, err);
  }
});

// PATCH
router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { name, gender, age, avatar } = data;
    if (!name || !gender) {
      errorHandle(res, "使用者資料未填寫完整");
    } else {
      const editContent = {
        name,
        gender,
        age,
        avatar,
      };
      const editUser = await User.findByIdAndUpdate(
        id,
        editContent,
        { new: true } // 回傳更新後的資料, default: false
      );

      if (editUser !== null) {
        successHandle(res, editUser);
      } else {
        errorHandle(res, "查無此 ID");
      }
    }
  } catch (err) {
    errorHandle(res, err);
  }
});

module.exports = router;
