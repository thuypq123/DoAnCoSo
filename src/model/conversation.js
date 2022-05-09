const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const conversation = new Schema({
    id: ObjectId,
    created_at: Date,
    updated_at: Date,
})

module.exports = mongoose.model('conversation', conversation);