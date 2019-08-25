// const _ = require('lodash');
// const axios = require('axios');
const UserModel = require('../../models/user');


const userResolver = async(parentValue, args, context, info) => {
    // console.log("parentVal in userResolver: ", parentValue)
    console.log("args in userResolver: ", args)
    // console.log("db: ", db.collection('users'))

    // console.log("info in userResolver: ", info)

    // return await axios.get(`http://localhost:4500/users/${args.id}`)
    // return await UserModel.find({ _id: args.id })

    

    const user = UserModel.find({ _id: args.id }).exec()

    if(!user) {
        throw Error('Error')
    }
    console.log("users: ", user)
    return user




    // return await context.collection('users').find()


    // return await UserModel.findById(args.id)
        // .then(res => res.data)
        // .then(res => {
        //     // console.log("res: ", res)
        // })
        // .catch(error => console.log("error in userResolve.js: ", error))
};

module.exports = userResolver;

