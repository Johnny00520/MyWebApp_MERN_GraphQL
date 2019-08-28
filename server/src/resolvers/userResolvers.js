import { User } from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import keys from '../../config/keys';
import { UserInputError } from 'apollo-server-express';
import { 
    validateRegisterInput,
    validateLoginInput
} from '../utils/validators';

const generateToken = (user) => {
    return jwt.sign({
        id: res.id,
        email: res.email,
        lastname: res.lastname
    }, keys.SECRET_KEY, { expiresIn: '1h'});
}

export const userResolvers = {
    Mutation: {
        createUser: async(parentValue, { firstname, lastname, age, companyId }) => {
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
        },
        userLogin: async(_, { email, password }) => {
            const { errors, valid } = validateLoginInput(email, password);

            if(!valid) {
                throw new UserInputError("Errors", { errors });
            }

            const user = await User.findOne({ email });
            if(!user) {
                errors.general = "User not found";
                throw new UserInputError("User is not found", { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if(!match) {
                errors.general = "Email and password do not match";
                throw new UserInputError("Wrong creditials", { errors });
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
        async register(_, { registerInput : {
            firstname,
            lastname,
            email,
            password,
            confirmPassword
        }}) {

            // Validate data
            const { valid, errors } = validateRegisterInput(firstname, lastname, email, password, confirmPassword);
            if(!valid) {
                throw new UserInputError("Error", { errors })
            }

            // Make sure user doesn't exist in db
            const user = await User.findOne({ email });
            if(user) {
                throw new UserInputError("Email has been taken", {
                    errors: {
                        email: "This Email has been taken!"
                    }
                }); 
            }

            // hash PW and create an auth token
            password = await bcrypt.hash(password, 12)

            const newUser = new User({
                firstname,
                lastname,
                email,
                password,
                createdAt: new Date().toISOString()
            })

            try {
                const res = await newUser.save();

                const token = generateToken(res);

                // This should be the same in /graphql
                return {
                    ...res._doc,
                    id: res._id,
                    token,
                    email,
                    firstname,
                    lastname
                }

            } catch(error) {
                return 'Error in newUser save:  ' + error
            }

        }


    }
}