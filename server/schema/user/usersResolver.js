const UserModel = require('../../models/user');

const usersResolver = async(parentValue, args ) => {

    const users = await UserModel.find().exec()
    if(!users) {
        console.log("here")
        throw new Error('Errir ub usersResolver.js')
    }
    return users

}

module.exports = usersResolver;
