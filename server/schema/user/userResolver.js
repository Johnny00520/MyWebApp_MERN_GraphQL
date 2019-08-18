const _ = require('lodash');
const users = [
    { id: "23", firstname: 'Johnny', lastname: 'Cheng', age: 32 },
    { id: "42", firstname: 'Vicky', lastname: 'Yen', age: 20 },
    { id: "35", firstname: 'Bilan', lastname: 'Chen', age: 60 },
    { id: "14", firstname: 'Aria', lastname: 'Horn', age: 20 }
]

const userResolver = async(parentValue, args) => {
    console.log("parentVal: ", parentValue)
    console.log("args: ", args)

    return _.find(users, { id: args.id })
        // .then(res => res.data)
};

module.exports = userResolver;

