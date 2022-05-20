const mongoose = require('mongoose');//We are exporting mongoose for the schema


//This is our User Schema
const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,   
    },
    age: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        requires: true
    }

});
//String "Users" = Name of the model-----Variable *//UserSchema//* represents the schema from that model
const UserModel = mongoose.model('Users', UserSchema)//Doing this will automatically create inside the DB system
module.exports = UserModel //Exports our schema