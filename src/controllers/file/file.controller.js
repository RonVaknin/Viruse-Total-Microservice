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
  // ----------- UPLOAD FILE -----------
  //   upload: (req, res, next) => {
  //       if(!req.file){
  //           res.status(400).send("File is missing");
  //           return;
  //       }
  //       fileService.upload(req, res, next);
  //   },
  // ----------- FILE URL -----------
  fileURL: (req, res, next) => {
    //no url in request
    if (!req.body || !req.body.url) {
      errResponse(res, 400, {
        error: "missing url",
        isAlive: "false",
        msg: "please add url to request body",
      });
      return;
    }
    let url = req.body.url;

    //URL didn't pass the regex test
    if (!validators.URL(url)) {
      errResponse(res, 400, {
        error: "invalid url",
        isAlive: "false",
        msg: "please add a valid url",
        url,
      });
      return;
    }
    {
      pings.send(url, (err, stdout, stderr) => {
        if (err || stderr) {
          errResponse(res, 400, {
            error: "url not responding",
            isAlive: "false",
            message: "invalid url",
            url,
          });
          return;
        }
        fileService.uploadURL(req, res, next);
      });
    }
  },
  // ----------- HASH FILE -----------
  hashFile: (req, res, next) => {},
  // ----------- FILE INFO -----------
  fileInfo: (req, res, next) => {
      //TODO: validate hash
      if (!req.params || !req.params.id){
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
