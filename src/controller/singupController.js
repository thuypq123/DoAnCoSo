const path = require('path');
const user = require('../model/user');
const jwt = require('jsonwebtoken');
exports.getSingup = (req, res) => {
    let singupPath = path.join(__dirname, '../view/singup.html');
    res.sendFile(singupPath);
}

exports.postSingup = async (req, res) => {
    const getUser = await user.findOne({ email: req.body.email });
    if (!getUser) {
        const newUser = await user.create({
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password,
            created_at: new Date()
        });
        const token = jwt.sign({email:newUser.email, id:newUser._id},process.env.SECRET_KEY);
        res.cookie("conversation", 0);
        res.redirect('/');
    }
    else {
        res.sendFile(path.join(__dirname, '../view/errorSingup.html'));
    }
}