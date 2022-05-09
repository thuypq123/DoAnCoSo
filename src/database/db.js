const mongoose = require('mongoose');
const env = require('dotenv');
async function connect(){
    try {
        mongoose.connect(process.env.DB_URL);
        console.log('Successfully connected to MongoDB');
    }catch(err){
        console.log(err);
    }
}
module.exports = {connect};