import React, { useState } from 'react';
import { useForm } from '../../utils/hooks';
import { useMutation } from "@apollo/react-hooks";
import { Form, Button, Message } from 'semantic-ui-react';
import { forgotPasswordValidatorInput } from '../../utils/validators';
import gql from 'graphql-tag';
import './ForgotPassword.scss';

const ForgotPassword = (props) => {
    const [berrors, setBErrors] = useState({});
    const [info, setInfo] = useState(false)

    const { onChange, onSubmit, values, ferrors } = useForm(passwordForgotCallback, forgotPasswordValidatorInput);

    const [passwordForgotReqSend, { loading }] = useMutation(FORGOT_PASSWORD_USER, {
        update(proxy, result) {
            if(result.data) setInfo({ info: true })
        },
        variables: {
            email: values.email
        },
        onError(err) {
            // debugger
            console.log("err.graphQLErrors[0].exception: ", err.graphQLErrors[0].extensions.exception.errors)
            setBErrors(err.graphQLErrors[0].extensions.exception.errors)
        }
    })

    function passwordForgotCallback() {
        passwordForgotReqSend()
    }

    return (
        <div className="forgot_pw_page">
            <div className="forgot_pw_page_container">

                {Object.keys(berrors).length > 0 && (
                    <div className="ui error message">
                        <ul className="list">
                            {Object.values(berrors).map((value) => {
                                // debugger
                                return <li key={value}>{value}</li>
                            })}
                        </ul>
                    </div>
                )}
                {info && (
                    <Message
                        success
                        header='Please go to your email to change the password'
                    />
                )}

                <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                    <h1>We all forget password from time to time...</h1>

                    <Form.Input
                        label="Email"
                        placeholder={ferrors.email ? ferrors.email : "Email..."}
                        name="email"
                        type="text"
                        value={values.email || ""}
                        onChange={onChange}
                        error={berrors.email || ferrors.email ? true : false}

                        icon='envelope'
                        iconPosition='left'
                    />

                    <Button type="submit" primary>Submit</Button>

                </Form>
            </div>
        </div>
    )
}

const FORGOT_PASSWORD_USER = gql`
    mutation userForgotPassword( $email: String! ) {
        userForgotPassword(email: $email) {
            id
            firstname
            lastname
            token
        }
    }
`;

export default ForgotPassword
