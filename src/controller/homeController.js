const path = require('path');
const user = require('../model/user')
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const env = require('dotenv').config();
const secret = process.env.SECRET_KEY;
exports.getHome = (req, res, next) =>{
    const cookies = req.cookies;
    let homePath = path.join(__dirname, '../view/login.html');
    res.sendFile(homePath);
    if(cookies.token){
        res.redirect('/chat');
    }
}

exports.postHome = async (req, res, next) =>{
    const userLogin = await user.findOne({email: req.body.email});
    if(userLogin){
        if(userLogin.password === req.body.password){
            const id = userLogin._id;
            const email = userLogin.email;
            token = jwt.sign({email: email,id:id},secret);
            res.cookie("token",token);
            res.cookie("id",id.toString());
            res.redirect('/chat');
        }
        else{
            res.redirect('/');
        }
    }
    else{
        res.redirect('/');
    }
}