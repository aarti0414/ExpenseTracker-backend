const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

exports.signup = (req,res)=>{
    const {name,email,phoneno,password} = req.body;
    const saltRounds=10;
    bcrypt.genSalt(saltRounds,function(err,salt){
        bcrypt.hash(password,salt,function(err,hash){
            if(err){
                console.log('Unable to create new user')
                return  res.json({message: 'Unable to create new user'})
            } 
            User.create({name,email,phoneno,password:hash}).then(()=>{
               return  res.status(201).json({message:'Successfully new user  Created'})
            }).catch(err=>{
               return res.status(403).json({error:'User Already exist'});
            })
        })
    })
}
function generateAccessToken(id) {
    return jwt.sign(id ,process.env.TOKEN_SECRET);
}

exports.login =(req,res)=>{
    const {email,password} = req.body;
    console.log(req.body);
    console.log("login successfull"+password);

    User.findAll({where:{email}}).then(user=>{
        if(user.length > 0){
            bcrypt.compare(password,user[0].password,function(err,response){        //password --> frontend     bcrypt(password) --hash(pw)
                                                                                    //user[0].password --> db   hash(pw)
                if(err){
                    console.log(err)
                    return res.json({success: false ,message:'something went wrong'})
                }
                if (response){
                    console.log(JSON.stringify(user));
                    const jwttoken = generateAccessToken(user[0].id);
                    res.json({token: jwttoken, success: true, message: 'Successfully Logged In'})
                // Send JWT
                }
                else {
                    // response is OutgoingMessage object that server response http request
                    return res.status(401).json({success: false, message: 'passwords do not match'});
                    }
            });
        }
        else {
            return res.status(404).json({success: false, message: 'passwords do not match'})
        }
    })
    
}
