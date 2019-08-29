const mongoose = require('mongoose');
const { Schema } = mongoose;

const companySchema = new Schema({
    name: String,
    industry: String,
    description: String,
    users: {
        type: Array(Schema.Types.ObjectId),
        ref: "companies"
    }
}, { collection: "companies" })

// model = collection in mongoDB
export const Company = mongoose.model("companies", companySchema)
