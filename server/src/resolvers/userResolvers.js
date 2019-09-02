import { User } from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authCheck } from '../utils/check_auth';
import nodeMailer from 'nodemailer';
import { transport, verify, sendEMAIL } from '../utils/emailTransport';

import { 
    UserInputError,
    AuthenticationError
} from 'apollo-server-express';
import { 
    validateRegisterInput,
    validateLoginInput,
    validateAdminCreateInput,
    validateEmailInput,
    validatePasswordResetInput
} from '../utils/validators';

const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        lastname: user.lastname,
        firstname: user.firstname
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
                throw new UserInputError("Error in validateRegisterInput: ", { errors })
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
        userForgotPassword: async(_, { email }, context) => {
            const { valid, errors } = validateEmailInput(email);
            if(!valid) {
                throw new UserInputError("Error in validateEmailInput", { errors })
            }

            const user = await User.findOne({ email: email.toLowerCase().trim() });
            if(!user) {
                throw new UserInputError("Email not found", {
                    errors: {
                        email: "The email address is not found!"
                    }
                }); 
            }

            const token = generateToken(user);
            user.resetPasswordToken = token,
            user.resetPasswordExpires = Date.now() + 3600000; // 1hr

            try {
                const res = await user.save();
                const smtpTransport = nodeMailer.createTransport(transport)

                await verify(smtpTransport);

                const mailOptions = {
                    to: res.email,
                    from: transport.auth.user,
                    subject: 'Re: The Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    context.req.headers.origin + '/recover/passwd_reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n',                           
                }

                await sendEMAIL(smtpTransport, mailOptions);

                // This should be the same in /graphql
                return {
                    ...res._doc,
                    id: res._id,
                    token,
                    email: res.email
                }

            } catch(error) {
                return 'Error in user forgot password:  ' + error
            }
        },
        userResetPassword: async(_, { password, confirmPassword, token }, context) => {

            const authUser = authCheck(context);
            const { valid, errors } = validatePasswordResetInput(password, confirmPassword);
            if(!valid) {
                throw new UserInputError("Error in validatePasswordInput", { errors })
            }

            const user = await User.findOne({ 
                resetPasswordToken: token,
                resetPasswordExpires: { $gt: Date.now() }
            });

            if(!user) {
                throw new UserInputError("Your token may be expired", {
                    errors: {
                        email: "The email address is not found!"
                    }
                }); 
            }
            
            const match = await bcrypt.compare(password, user.password);
            if(match) {
                throw new UserInputError("Your password is too similar with previous one", {
                    errors: {
                        password: "Your password is way too similar with previous one"
                    }
                });
            }

            const newPassword = await bcrypt.hash(password, 12)
            user.password = newPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            
            try {
                const res = await user.save();
                const smtpTransport = nodeMailer.createTransport(transport)

                await verify(smtpTransport);

                const mailOptions = {
                    to: res.email,
                    from: transport.auth.user,                                       
                    subject: 'Re: Successfully changed your password',
                    text: 'Hello, ' + res.firstname + ' ' + res.lastname + '\n\n' +
                        'This is a confirmation that the password for your account ' + res.email + ' for the johnny-cheng-dev webapp has just been changed.\n' +
                        'You can login with your new password by clicking the following link.\n\n' +
                        context.req.headers.origin + '/adminlayout' + '\n\n' +
                        'Please do not reply directly this email.\n'
                }

                await sendEMAIL(smtpTransport, mailOptions);

                // This should be the same in /graphql
                return {
                    ...res._doc,
                    id: res._id,
                    token,
                    email: res.email
                }

            } catch(error) {
                return 'Error in user forgot password:  ' + error
            }


        }

    }
}