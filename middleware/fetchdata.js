var jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env.local' });
const JWT_SECRET = process.env.JWT_TOKEN;
const fetchuser=async(req,res,next)=>{
    try{
        const token=req.header('auth-token');
        if(!token){
            return res.status(401).json({error:"Please authenticate using a valid token"});
        }
        const data=jwt.verify(token,JWT_SECRET);
        console.log(data);
        req.userid=data.userId;
        next();
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: "internal server error1" ,message:err.message});
    }
}
module.exports=fetchuser;