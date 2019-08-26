const mongoose = require('mongoose');
const { Schema } = mongoose;

const companySchema = new Schema({
    name: String,
    industry: String,
    description: String,
    users: Array
}, { collection: "companies" })

// model = collection in mongoDB
export const Company = mongoose.model("companies", companySchema)
