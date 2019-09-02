import React, { useState } from 'react';
import { useForm } from '../../utils/hooks';
import { useMutation } from "@apollo/react-hooks";
import { Form, Button, Message } from 'semantic-ui-react';
import gql from 'graphql-tag';

import './PasswordReset.scss';

const PasswordReset = (props) => {
    // console.log("props: ", props)

    const [errors, setErrors] = useState({});
    const [info, setInfo] = useState(false);

    localStorage.setItem("jwtToken", props.match.params.token);

    const { onChange, onSubmit, values } = useForm(passwordResetCallback, {
        password: "",
        confirmPassword: "",
        token: localStorage.getItem('jwtToken')
    });

    const [passwordResetReqSend, { loading }] = useMutation(USER_PASSWORD_RESET, {
        variables: values,
        update: (proxy, result) => {
            if(result.data) setInfo({ info: true })
        },
        onError(err) {
            if(err.graphQLErrors[0].extensions.exception.errors) {
                setErrors(err.graphQLErrors[0].extensions.exception.errors)
            } else {
                setErrors(err.graphQLErrors[0].message)
            }
        },
        onCompleted: () => {
            localStorage.removeItem('jwtToken')
        }
    })

    function passwordResetCallback() {
        passwordResetReqSend()
    }

    return (
        <div className="pw_reset_page">
            <div className="pw_reset_container">

                {typeof(errors) === 'string' ? 
                    <div className="ui error message">
                        {errors} 
                    </div> : 
                    Object.keys(errors).length > 0 && (
                    <div className="ui error message">
                        <ul className="list">
                            {/* {Object.values(errors) } */}
                            {Object.values(errors).map((value) => (
                                // debugger
                                <li key={value}>{value}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {info && (
                    <Message
                        success
                        header='Successful changed your password. Please check your email!'
                    />
                )}

                <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                    <h1>Remember your password this time...</h1>

                    <Form.Input
                        label="Password"
                        placeholder="Password..."
                        name="password"
                        type="text"
                        value={values.password}
                        onChange={onChange}
                        error={errors.password ? true : false}
                        icon='lock'
                        iconPosition='left'
                    />
                    <Form.Input
                        label="Confirm password"
                        placeholder="Enter password again..."
                        name="confirmPassword"
                        type="text"
                        value={values.confirmPassword}
                        onChange={onChange}
                        error={errors.confirmPassword ? true : false}

                        icon='lock'
                        iconPosition='left'
                    />

                    <Button type="submit" primary>Submit</Button>
                </Form>
            </div>
        </div>
    )
}

const USER_PASSWORD_RESET = gql`
    mutation userResetPassword( $password: String! $confirmPassword: String! $token: String! ) {
        userResetPassword(password: $password confirmPassword: $confirmPassword token: $token) {
            id
            email
            token
        }
    }
`;


export default PasswordReset;
