import { User } from '../models/user';


export const userResolver = async(parentValue, { firstname, lastname, age, companyId }) => {
    const newUser = new User({
        firstname,
        lastname,
        age,
        companyId
    })
    try {
        return await newUser.save()
    } catch(error) {
        return 'Error in newUser save: e ' + error
    }
}