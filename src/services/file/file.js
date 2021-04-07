//Modules
const axios = require("axios");
const querystring = require("querystring");
const fs = require("fs");
//variables
const path = "files";

const services = {
  //   upload: (req, res, next) => {
  //       console.info(req.file.buffer);
  //       let data;
  //       fs.createWriteStream(req.file.buffer).write(data);
  //     const options = {
  //       method: "post",
  //       headers: {"Content-Type":"multipart/form-data"},
  //       data:{
  //           file: data,
  //       },
  //       url: path,
  //     };
  //     if (req.headers["x-apikey"] || req.headers["vt-token"]) {
  //       let head = req.headers["x-apikey"] || req.headers["vt-token"];
  //       options.headers = { "x-apikey": head };
  //     }

  //     axios(options)
  //       .then((response) => {
  //         console.info("then");

  //         res.send(response.data);
  //       })
  //       .catch((error) => {
  //         console.info(error,"eror");

  //         res.status(error.response.status).send(error.response.statusText);
  //       });
  //   },
  uploadURL: (req, res, next) => {
    const data = { url: req.body.url };
    const options = {
      method: "GET",
      url: `${path}/upload_url?file=${req.body.url}`,
    };
    // if (req.headers["x-apikey"] || req.headers["vt-token"]) {
    //   let head = req.headers["x-apikey"] || req.headers["vt-token"];
    //   options.headers = { "x-apikey": head };
    // }
    axios(options)
      .then((response) => {
          console.info(response);
        res.send(response.data);
      })
      .catch((error) => {
        res.status(error.response.status).send(error.response.statusText);
      });
  },
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
