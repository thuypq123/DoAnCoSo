const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

const conversationUser = new Schema({
    id: objectId,
    conversation_id: String,
    user_id: String,
    created_at: Date,
    updated_at: Date,
})

module.exports = mongoose.model('conversationUser', conversationUser);