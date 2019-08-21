
const axios = require('axios');
const Company = require('../../models/company');

const userResolver = async(parentValue, args) => {
    console.log("parentVal: ", parentValue)
    console.log("args: ", args)

    return await axios.get(`http://localhost:4500/companies/${args.id}`)
        .then(res => res.data)
        .catch(error => console.log("error in userResolve.js: ", error))
};

module.exports = userResolver;

