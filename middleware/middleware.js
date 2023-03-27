const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.headers.authorization;
    if(token){
        const decoded=jwt.verify(token,"shhhhh");
        if(decoded){
            req.body.userId=decoded.userId;
            // console.log(decoded)
            next()
        }else{
            res.status(400).send({"msg":"Please login first"})
        }

    }else{
        res.status(400).send({"msg":"Please login first"})
    }
}

module.exports={
    auth
}