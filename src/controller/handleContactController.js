const user = require('../model/user');

exports.getHandleContact = (req,res) => {
    res.send({hello:"hello"})
}

exports.postHandleContact = async (req,res) => {
    const fullname = req.body==""? null:req.body.fullname;
    if(fullname){
        const getUser = await user.find({fullname:{ "$regex": fullname, "$options": "i^" }});
        listUser = getUser.map(item=>{
            return {_id: item._id, fullname: item.fullname, email: item.email}
        })
        res.send(listUser);
    }
    else{
        res.send({error:"error"});
    }
}