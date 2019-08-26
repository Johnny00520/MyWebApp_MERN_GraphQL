const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    age: String,
    companyId: String
}, { collection: 'users'})

// model = collection in mongoDB
export const User = mongoose.model("users", userSchema)
