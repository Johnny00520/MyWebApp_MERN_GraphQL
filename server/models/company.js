const mongoose = require('mongoose');
const { Schema } = mongoose;

const companySchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    users: Array
})

// model = collection in mongoDB
// module.exports = mongoose.model("company", companySchema)
