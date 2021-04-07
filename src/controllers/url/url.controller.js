//internal utils
const validators = require("../../util/validate");
const pings = require("../../util/ping");
//service
const { urlService } = require("../../services");
//controller
let controllers = {
  // ----------- ABOUT --------------
  about: (req, res, next) => {
    let aboutInfo = {
      name: "url controller",
      version: "1.0.0",
    };
    res.json(aboutInfo);
  },
  // ----------- SUBMIT URL -----------
  submitURL: (req, res, next) => {
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
        urlService.submit(req, res, next);
      });
    }
  },
  // ----------- ANALYSE URL -----------
  analyseURL: (req, res, next) => {
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
        fileService.analyse(req, res, next);
      });
    }
  },
  // ----------- URL INFO -----------
  analyseURLID: (req, res, next) => {
    //TODO: validate hash
    if (!req.params || !req.params.id){
      errResponse(res, 400, {
        error: "missing url id",
        msg: "please add url id to request path",
      });
      return;
    }
    urlService.get(req, res, next);
  }
};

function errResponse(res, status, data) {
  res.status(status).json(data);
}

module.exports = controllers;
