const path = require('path');
const { stringify } = require('querystring');
const user = require('../model/user');
const getCookies = require('../library/getCookies');



exports.getEditProfile = (req, res) => {
    res.sendFile(path.join(__dirname, '../view/editProfile.html'));
}
exports.postEditProfile = async (req, res) => {
    const id = req.cookies.id;
    const name = req.body.fullname;
    const password = req.body.password;
    const email = req.body.email;
    const newPassword = req.body.newPassword;
    const getUser  = await user.findOne({_id:id, password:password});
    const getEmailExists = await user.findOne({email:email});
    if(!getEmailExists){
        if(req.file !== undefined)
        {
            const avatar = req.file.filename;
            if(getUser){
                const newUpdate = await user.findOneAndUpdate({ _id: id }, { fullname: name, password: newPassword,fullname: name, email: email, avatar: avatar });
                console.log(newUpdate);
                res.redirect('/');
            }
        }else{
            if(getUser){
                const newUpdate = await user.findOneAndUpdate({ _id: id }, { fullname: name, password: newPassword,fullname: name, email: email });;
                res.redirect('/');
            }
        }
    }else{
        res.sendFile(path.join(__dirname, '../view/errorEdit.html'));
    }
}