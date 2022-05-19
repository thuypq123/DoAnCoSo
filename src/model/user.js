const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
    id: ObjectId,
    fullname: String,
    avatar: String,
    email: String,
    password: String,
    created_at: Date,
})
module.exports = mongoose.model('user', user);