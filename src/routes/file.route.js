const express = require("express");
const { fileController } = require("../controllers");

var router = express.Router({
  strict: true,
});

router.post("/", (req, res, next) => {
  // fileController(req, res);
  res.send("file router");
});

router.get("/", (req, res, next) => {
  res.send("file router");
});

module.exports = router;
