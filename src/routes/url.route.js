//modules
const express = require("express");
//internal
const { urlController } = require("../controllers");
//navigation & middlware
var router = express.Router({
  strict: true,
});

router.get("/about", (req, res, next) => {
  res.send(urlController.about(req, res, next));
});
router.post("/", (req, res, next) => {
  urlController.analyseURL(req, res, next);
});

module.exports = router;
