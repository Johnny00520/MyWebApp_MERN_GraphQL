import nodeMailer from 'nodemailer';
import { transport, verify, sendEMAIL } from '../utils/emailTransport';
import keys from '../../config/keys';
import contactTemplate from '../utils/contactTemplate';
import {
    validateContactPageInput
} from '../utils/validators';

export const contactEmailResolvers = {
    Query: {

    },
    Mutation: {
        contactPageSendEmail: async(parentValue, { contactPageInput: {
            firstname,
            lastname,
            email,
            content
        }}, context) => {

            const { valid, errors } = validateContactPageInput(firstname, lastname, email, content);
            if(!valid) {
                throw new UserInputError("Error in validateContactPageInput", { errors })
            }

            const smtpTransport = nodeMailer.createTransport(transport)
            await verify(smtpTransport);

            const mailOptions = {
                to: keys.NODE_MAILER_USER,
                from: email,
                subject: 'Re: Someone has questions for Johnny Cheng',
                html: contactTemplate(firstname, lastname, email, content)
            }

            await sendEMAIL(smtpTransport, mailOptions);

            // This should be the same in /graphql
            return {
                firstname,
                lastname,
                email
            }
        }
    }
}
