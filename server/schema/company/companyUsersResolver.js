
const axios = require('axios');

const companyUsersResolver = async(parentValue, args) => {

    return await axios.get(`http://localhost:4500/companies/${parentValue.id}/users`)
        .then(res => res.data)
        .catch(error => console.log('error in companyUsersResolver', error));
}

module.exports = companyUsersResolver;
