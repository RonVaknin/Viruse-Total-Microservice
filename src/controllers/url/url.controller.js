//internal
const validators = require("../../util/validate");
const pings = require("../../util/ping");
//controller
let controllers = {
  about: (req, res, next) => {
    let aboutInfo = {
      name: "url controller",
      version: "1.0.0",
    };
    res.json(aboutInfo);
  },
  analyseURL: async (req, res, next) => {
    //no url in request
    if (!req.body || !req.body.url) {
      res
        .status(400)
        .json({
          error: "missing url",
          isAlive: "false",
          msg: "please add url to request body",
        });
      return;
    }
    let url = req.body.url;

    //URL didn't pass the regex test
    if (!validators.URL(url)) {
      res
        .status(400)
        .json({
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
          res
            .status(400)
            .json({
              error: "url not responding",
              isAlive: "false",
              message: "invalid url",
              url,
            });
          return;
        }
        
      });
    }
  },
};

module.exports = controllers;
