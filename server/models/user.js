const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    firstname: String,
    lastname: String,
    age: String,
    companyId: String
})

// model = collection in mongoDB
// module.exports = mongoose.model("users", userSchema)
