const path = require('path');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const secret = process.env.SECRET_KEY;
exports.getChat = (req, res, next) =>{
    res.sendFile(path.join(__dirname, '../view/chat.html'));
}
exports.postChat = (req, res, next) =>{
    const token = req.body.token;
    console.log(token);
    if(token){
        const tokenDecode = jwt.verify(token,secret);
        if(tokenDecode){
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