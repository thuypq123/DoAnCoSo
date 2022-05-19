const path = require('path');
const jwt = require('jsonwebtoken');
const user = require('../model/user');
const conversation = require('../model/conversation');
const conversationUser = require('../model/conversationUser');

const compareArray = (array1, array2) => {
    for(let i = 0; i < array1.length; i++){
        for(let j = 0; j < array2.length; j++){
            if(array1[i].conversation_id === array2[j].conversation_id){
                return true;
            }
        }
    }
    return false;
}

const compareArrayExists = (array1, array2) => {
    for(let i = 0; i < array1.length; i++){
        for(let j = 0; j < array2.length; j++){
            if(array1[i].conversation_id === array2[j].conversation_id){
                return array1[i].conversation_id;
            }
        }
    }
}

exports.postContact = async (req, res) => {
    const userRequest = jwt.verify(req.body.token, process.env.SECRET_KEY);
    if(userRequest){
        const userRequest_id = userRequest.id;
        const userSearch_id = req.body.idSearch;
        const userRequestConversation = await conversationUser.find({user_id:userRequest_id});
        const userSearchConversation = await conversationUser.find({user_id:userSearch_id});
        if(compareArray(userRequestConversation, userSearchConversation)){
            const conversationExist = compareArrayExists(userRequestConversation, userSearchConversation);
            const deleteConversation = await conversationUser.deleteMany({conversation_id:conversationExist});
            const deleteConversation2 = await conversation.deleteMany({_id:conversationExist});
            const result = {
                message: "delete success",
                conversation: conversationExist,
                delete: true,
            }
            res.send(result);
        }else{
            const newConversation = await conversation.create({});
            const conversationUser1 = await conversationUser.create({
                user_id: userRequest_id,
                conversation_id: newConversation._id,
                created_at: new Date()
            });
            const conversationUser2 = await conversationUser.create({
                user_id: userSearch_id,
                conversation_id: newConversation._id,
                created_at: new Date()

            });
            const result = await newConversation.save();
            conversationUser1.save();
            conversationUser2.save();
            const getUserSearchResult = await user.findOne({_id:userSearch_id});
            res.send({result,delete: false,...getUserSearchResult});
        }
    }
}