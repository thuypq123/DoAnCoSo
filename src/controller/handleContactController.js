const user = require('../model/user');
const conversationUser = require('../model/conversationUser')

const compareArr = (arr1, arr2) =>{
    for(let i = 0; i < arr1.length; i++){
        for(let j = 0; j < arr2.length; j++){
            if(arr1[i].conversation_id === arr2[j].conversation_id){//arr1[i].conversation_id === arr2[j].conversation_id
                return true;
            }
        }
    }
    return false;
}

exports.getHandleContact = (req,res) => {
    res.send({hello:"hello"})   
}

exports.postHandleContact = async (req,res) => {
    const fullname = req.body==""? null:req.body.fullname;
    const userRequest = req.body.id;
    const listConversationsUserRequest = await conversationUser.find({user_id:userRequest});
    if(fullname){
        const getUser = await user.find({fullname:{ "$regex": fullname, "$options": "i^" }});
        const listUser = await Promise.all(getUser.map(async (aUser) => {
            const listConversation = await conversationUser.find({user_id:aUser._id});
            if(compareArr(listConversation,listConversationsUserRequest)){
                const obj = aUser.toObject();
                obj.avatar = aUser.avatar;
                obj.added = true;
                return obj;
            }else{
                return aUser;
            }
        }))
        res.send(listUser)
    }
    else{
        res.send({error:"error"});
    }
}