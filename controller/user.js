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

