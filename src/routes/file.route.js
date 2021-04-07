//modules
const express = require("express");
//internal
const { fileController } = require("../controllers");
// const fileUpload = require('../middleware/fileUpload');

var router = express.Router({
  strict: true,
});

router.get("/about", (req, res, next) => {
  res.send(fileController.about(req, res, next));
});

// router.post("/",fileUpload, (req, res, next) => {
//   fileController.upload(req, res, next);
// });

router.get("/:id", (req, res, next) => {
  fileController.fileInfo(req, res, next);
});

router.post("/", (req, res, next) => {
  fileController.fileURL(req, res, next);
});

module.exports = router;
