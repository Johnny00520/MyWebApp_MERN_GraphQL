import { User } from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import keys from '../../config/keys';
const mongoose = require('mongoose');
import { 
    UserInputError,
    AuthenticationError
} from 'apollo-server-express';
import { 
    validateRegisterInput,
    validateLoginInput,
    validateAdminCreateInput
} from '../utils/validators';
import {
    authCheck
} from '../utils/check_auth';


const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        lastname: user.lastname
    }, keys.SECRET_KEY, { expiresIn: '1h'});
}

export const userResolvers = {
    Query: {
        allCompanies: () => Company.find(),
        // Decending order
        allUsers: async() => User.find().sort({ createdAt: -1 }),
        getUser: async(_, { userId }) => {
            try {
                const user = await User.findById(userId);
                if(user) {
                    return user;
                } else {
                    throw new Error("User not found");
                }
            } catch(error) {
                throw new Error(error);
            }
        }
    },
    Mutation: {
        adminCreateUser: async(parentValue, { adminCreateInput: {
            firstname,
            lastname,
            email,
            password
        }}, context) => {
            const authUser = authCheck(context);
            // console.log("authUser: ", authUser)

            const { valid, errors } = validateAdminCreateInput(firstname, lastname, email, password);
            if(!valid) {
                throw new UserInputError("Error in validateAdminCreateInput", { errors })
            }

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

                // This should be the same in /graphql
                return {
                    ...res._doc,
                    id: res._id,
                    email,
                    firstname,
                    lastname
                }

            } catch(error) {
                return 'Error in newUser save:  ' + error
            }
        },
        adminDeleteUser: async(_, { userId }, context) => {
            // Because we handle all possible situation for the token check in the function, so
            // the return variable doesn't need to do anything
            const authUser = authCheck(context);

            try {
                await User.findOneAndDelete({ _id: userId })
                return "User deleted Successfully";

            } catch(error) {
                return 'Error in adminDeleteUser in try block:  ' + error;
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
        register: async(_, { registerInput : {
            firstname,
            lastname,
            email,
            password,
            confirmPassword
        }}) => {
            // Validate data
            const { valid, errors } = validateRegisterInput(firstname, lastname, email, password, confirmPassword);
            if(!valid) {
                throw new UserInputError("Error in validateRegisterInput", { errors })
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

        },
        

    }
}