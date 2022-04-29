var express = require("express");
var router = express.Router();
const { errorHandle, successHandle } = require("../services/httpHandle");

router.get("", (req, res) => {
  const { category, page } = req.query;
  successHandle(res, {
    category,
    page,
  });
});

module.exports = router;
