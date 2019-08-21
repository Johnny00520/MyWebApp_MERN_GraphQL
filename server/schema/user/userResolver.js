// const _ = require('lodash');
const axios = require('axios');
const User = require('../../models/user');


const userResolver = async(parentValue, args) => {
    console.log("parentVal: ", parentValue)
    console.log("args: ", args)

    return await axios.get(`http://localhost:4500/users/${args.id}`)
    // return await User.find({ _id: args.id })
        .then(res => res.data)
        .catch(error => console.log("error in userResolve.js: ", error))
};

module.exports = userResolver;

