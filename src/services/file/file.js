//Modules
const axios = require("axios");
const querystring = require("querystring");
const fs = require("fs");
//variables
const path = "files";

const services = {
  get: (req, res, next) => {
    let id = req.params.id;
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
  },
};

module.exports = services;
