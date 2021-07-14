const jwt = require("jsonwebtoken");
const jwtKey = "myJwtSecretKey";
const useragent = require('useragent');

const auth = (req,res,next)=>{
   const agent = useragent.parse(req.headers['user-agent']);

   const deviceInfo = Object.assign({}, {
     device: agent.device,
     os: agent.os,
   });
   req.device = deviceInfo;
  
   next();
}


module.exports = auth;