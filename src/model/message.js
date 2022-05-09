const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const message = new Schema({
    id: ObjectId,
    user_id: String,
    conversation_id: String,
    text: String,
    created_at: Date,
})
module.exports = mongoose.model('message', message);