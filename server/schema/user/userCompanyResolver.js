
const axios = require('axios');

const userCompanyResolver = async(parentValue, args) => {
    console.log("parentVal: ", parentValue)
    console.log("args: ", args)

    return await axios.get(`http://localhost:4500/companies/${parentValue.companyId}`)
        .then(res => res.data)
        .catch(error => console.log("error in userCompanyResolver.js: ", error))
}

module.exports = userCompanyResolver;