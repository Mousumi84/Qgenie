import jwt from 'jsonwebtoken';

function isAuth(req,res,next) {
    let token = req.headers['authorization'];
    
    if(!token) {
        return res.send({
            status: 401,
            message: "Session Expired or Unauthorized , Please login again",
        });
    }

    const decoded = jwt.verify(token,process.env.SECRET_KEY);
    req.user = decoded; 
       // console.log("decoded => ",decoded);
    next();
}

export default isAuth;