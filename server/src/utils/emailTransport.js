import keys from '../../config/keys';

export const transport = {
    service: 'Gmail',
    auth: {
        user: keys.NODE_MAILER_USER,
        pass: keys.NODE_MAILER_PW
    }
}

export const verify = (smtpTransport) => (
    smtpTransport.verify((error, success) => {
        if (error) {
            console.log("server is not ready for smtpTransport in forgot password: ", error);
        } else {
            console.log('Server is ready to take messages and send email');
        }
    })
)

export const sendEMAIL = (smtpTransport, mailOptions) => (
    smtpTransport.sendMail(mailOptions, (err, info) => {
        if(err) {
            return console.log('err in sending email in forgot password: ', err)
        } else {
            // console.log('Message sent: %s', JSON.stringify(info, null, 4));
            done()
        }
    })
)