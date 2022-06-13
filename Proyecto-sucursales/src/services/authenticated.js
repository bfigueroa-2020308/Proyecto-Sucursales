'user strict'

const jwt = require('jwt-simple');
const secretKey = 'Dato';

exports.ensureAuth = (req, res, next)=>{
    if(!req.headers.authorization){
        return res.status(401).send({message: 'The request does not contain the authentication header'})
    }else{
        try{
            let token = req.headers.authorization.replace(/['"]+/g, '');
            var payload = jwt.decode(token, secretKey);
        }catch(err){
            console.log(err);
            return res.status(400).send({message: 'Token is not valid or expired'});
        }
        req.user = payload;
        next();
    }
}


exports.isAdmin = async (req, res, next)=>{
    try{
        const role = req.user.role;
        if(role === 'ADMIN') next()
        else return res.status(403).send({message : 'user unauthorized'});
    }catch(err){
        console.log(err);
        return err;
    }
}