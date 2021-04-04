//module
const axios = require('axios');
//internal
const fileService = require("./file/file");
const urlService = require("./url/url");

//TODO: add request limit per time unit, set timeout
//TODO: set global variable?

const api_version = "v3";
// const path = "urls";
const vturl_api = `https://www.virustotal.com/api`;

axios.defaults.baseURL = `${vturl_api}/${api_version}`;
axios.defaults.headers.common['x-apikey'] = process.env.VT_API_TOKEN || "";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


module.exports = { fileService, urlService };
