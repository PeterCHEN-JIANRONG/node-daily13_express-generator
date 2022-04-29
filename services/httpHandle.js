const errorHandle = (res, err) => {
  const obj = {
    status: "false",
    message: "欄位未填寫正確或無此 id",
  };

  if (typeof err === "string" && err !== "") {
    obj.message = err;
  } else if (err.message) {
    obj.message = err.message;
  }
  res.status(400).json(obj);
};

const successHandle = (res, data, message = "") => {
  const obj = {
    status: "success",
    data,
  };
  if (message !== "") {
    // 若有 message 才加進去 res
    obj.message = message;
  }
  res.status(200).json(obj);
};

module.exports = {
  errorHandle,
  successHandle,
};
