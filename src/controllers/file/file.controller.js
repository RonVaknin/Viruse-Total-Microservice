const { fileService } = require("../../services");
const validators = require("../../util/validate");
const pings = require("../../util/ping");

let controllers = {
  // ----------- ABOUT --------------
  about: (req, res, next) => {
    let aboutInfo = {
      name: "file controller",
      version: "1.0.0",
    };
    res.json(aboutInfo);
  },
  // ----------- FILE INFO -----------
  fileInfo: (req, res, next) => {
    //TODO: validate hash
    if (!req.params || !req.params.id) {
      errResponse(res, 400, {
        error: "missing file id",
        msg: "please add file id to request path",
      });
      return;
    }
    fileService.get(req, res, next);
  },
};

function errResponse(res, status, data) {
  res.status(status).json(data);
}
module.exports = controllers;
