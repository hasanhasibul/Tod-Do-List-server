const  jwt = require('jsonwebtoken');

module.exports.verifyToken = (req,res,next) =>{

    const token = req.headers['token-key']

    jwt.verify(token, 'secret123', function(err, decoded) {
        if (err) {
            res.status(401).json({status:"unauthorize"});
        } else {
            // get username from decoded data and add into req headers
           const username = decoded['data']['userName'];
           req.headers.userName = username ;
            next()
        }
      })
}