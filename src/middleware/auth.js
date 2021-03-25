/**check for Virus Total api key from 3 places
 * x-apikey in request header
 * vt-token in request header
 * VT_API_TOKEN in local evironment variables
 * if all 3 are missing, an authentication error sent to client
 */

module.exports = ((req,res,next) => {
    let vt_token = req.headers['x-apikey'] || req.headers['vt-token'] || process.env.VT_API_TOKEN;
    console.info(vt_token);
    
    if (!vt_token){
        res.status(401).send('Unauthorized api key, please add to request.vt_token or request.key the token');
        return;
    }
    req.token = vt_token;
    next();
});