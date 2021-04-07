//modules
const express = require("express");
//internal
const { urlController } = require("../controllers");
//navigation & middlware
var router = express.Router({
  strict: true,
});
// ----------- API ENDPOINT INFO -----------
router.get("/about", (req, res, next) => {
  res.send(urlController.about(req, res, next));
});
// ----------- SUBMIT NEW URL -----------
router.post("/", (req, res, next) => {
  urlController.submitURL(req, res, next);
});
// ----------- ANALYSE URL -----------
router.post("/analyse", (req, res, next) => {
  urlController.analyseURL(req, res, next);
});
// ----------- GET URL INFO -----------
router.get("/:id", (req, res, next) => {
  urlController.analyseURLID(req, res, next);
});
module.exports = router;
