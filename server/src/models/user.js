const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    password: String,
    email: String,
    createdAt: String,
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    age: String,
    companyId: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
}, { collection: 'users'})

// model = collection in mongoDB
export const User = mongoose.model("users", userSchema)
