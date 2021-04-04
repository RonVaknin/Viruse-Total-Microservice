const exec = require("child_process").exec;
//ping controller
const pings = {
  send: (url, callback) => {
    ping(url, callback);
  },
};
module.exports = pings;

/**
 * send 3 pings with 1.5 sc timout
 * @param {string} url
 * @param {function(error,stdout,stderr)} callback
 */
function ping(url, callback) {
  let noProtocolUrl = url.split("//");
  noProtocolUrl = noProtocolUrl[noProtocolUrl.length - 1];
  let p = exec(`ping -n 3 -w 1500 ${noProtocolUrl}`, callback);
}
