'user strict'

const bcrypt = require('bcrypt-nodejs');

exports.validateData = (data)=>{
    let keys = Object.keys(data), msg = '';

    for(let key of keys){
        if(data[key] !== null && data[key] !== undefined && data[key] !== '') continue;
            msg += `The param ${key} is required \n`;
    }
    return msg
}

exports.checkUpdate = async (user)=>{
    try{
        if(Object.entries(user).length === 0 || user.role)
            return false;
        else 
            return true;
    }catch(err){
        console.log(err);
        return err;
    }
}

