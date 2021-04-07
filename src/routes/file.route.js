//modules
const express = require("express");
//internal
const { fileController } = require("../controllers");

var router = express.Router({
  strict: true,
});
// ----------- API ENDPONT INFO -----------
router.get("/about", (req, res, next) => {
  res.send(fileController.about(req, res, next));
});
// ----------- ANALYSE FILE BY ID -----------
router.get("/:id", (req, res, next) => {
  fileController.fileInfo(req, res, next);
});


module.exports = router;
