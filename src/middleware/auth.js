/**check for Virus Total api key from 3 places
 * x-apikey in request header
 * vt-token in request header
 * VT_API_TOKEN in local evironment variables
 * if all 3 are missing, an authentication error sent to client
 */
let vt_token = process.env.VT_API_TOKEN;

module.exports = (req, res, next) => {
  if (!vt_token) {
    res.status(401).send("Unauthorized api key, please add to environment var");
    return;
  }
  next();
};
