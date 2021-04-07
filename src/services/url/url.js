//modules
const querystring = require("querystring");
const axios = require("axios");
//api variables
const path = "/urls";

const services = {
  submit: (req, res, next) => {
    const data = { url: req.body.url };
    const options = {
      method: "POST",
      data: querystring.stringify(data),
      url: path,
    };
    // if (req.headers["x-apikey"] || req.headers["vt-token"]) {
    //   let head = req.headers["x-apikey"] || req.headers["vt-token"];
    //   options.headers = { "x-apikey": head };
    // }
    axios(options)
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        res.status(error.response.status).send(error.response.statusText);
      });
  },
  analyse: (req, res, next) => {
    //set url to base 64 without padding
    let urlBase64 = Buffer.from(req.body.url, "utf-8")
      .toString("base64")
      .replace(/=/g, "");

    const data = { url: urlBase64 };
    const options = {
      method: "POST",
      url: `${path}/${urlBase64}/analyse`,
    };
    axios(options)
      .then((response) => {
        let id = response.data.data.id.split("-")[1];
        const options = {
          method: "GET",
          url: `${path}/${id}`,
        };
        axios(options)
          .then((response) => {
            res.send(response.data.data);
            return;
          })
          .catch((error) => {
            res
              .status(error.status || 500)
              .send(error.statusText || "Internal Server Error");
            return;
          });
      })
      .catch((error) => {
        res
          .status(error.status || 500)
          .send(error.statusText || "Internal Server Error");
        return;
      });
  },
  get: (req, res, next) => {
    let id = req.params.id;
    console.info(id);
    const options = {
      method: "GET",
      url: `${path}/${id}`,
    };
    axios(options)
      .then((response) => {
        res.send(response.data.data);
        return;
      })
      .catch((error) => {
        console.info(error);
        res
          .status(error.status || 500)
          .send(error.statusText || "Internal Server Error");
        return;
      });
  },
};

module.exports = services;
