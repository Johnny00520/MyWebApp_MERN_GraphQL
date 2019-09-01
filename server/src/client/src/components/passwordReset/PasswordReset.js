import React, { useState } from 'react';
import { useForm } from '../../utils/hooks';
import { useMutation } from "@apollo/react-hooks";
import { Form, Button, Message } from 'semantic-ui-react';
import './PasswordReset.scss';
import gql from 'graphql-tag';

const PasswordReset = (props) => {
    console.log("props: ", props)

    const [errors, setErrors] = useState({});
    const [info, setInfo] = useState(false);

    const { onChange, onSubmit, values } = useForm(passwordResetCallback, {
        password: "",
        confirmPassword: "",
        authorization: "Bearer " + props.match.params.token
    });

    const [passwordResetReqSend, { loading, error }] = useMutation(USER_PASSWORD_RESET, {

        variables: values,
        update: (proxy, result) => {
            console.log("proxy: ", proxy)
            console.log("result: ", result)
        },
        onError(err) {
            // debugger
            // console.log("err.graphQLErrors[0].exception: ", err.graphQLErrors[0].extensions.exception.errors)
            setErrors(err.graphQLErrors[0].message)
        },
    })

    // const [passwordResetReqSend, { loading }] = useMutation(USER_PASSWORD_RESET, {
    //     update: (proxy, result) => {
    //         console.log("result: ", result)
    //     },
    //     variables: {
    //         password: values.password,
    //         confirmPassword: values.confirmPassword,
    //         authorization: values.authorization
    //     },
    //     onError(err) {
    //         debugger
    //         console.log("err.graphQLErrors[0].exception: ", err.graphQLErrors[0].extensions.exception.errors)
    //         setErrors(err.graphQLErrors[0].extensions.exception.errors)
    //     },
    // })

    function passwordResetCallback() {
        passwordResetReqSend()
    }

    return (
        <div className="pw_reset_page">
            <div className="pw_reset_container">

                {Object.keys(errors).length > 0 && (
                    <div className="ui error message">
                        <ul className="list">
                            {/* {Object.values(errors).map((value) => (
                                <li key={value}>{value}</li>
                            ))} */}
                            {/* <li>{error.graphQLErrors[0].extensions.message}</li> */}
                            <li>{errors}</li>
                        </ul>
                    </div>
                )}
                {/* { error && (
                    <div className="ui error message">
                        <ul className="list">
                            <li>{error.graphQLErrors[0].extensions.message}</li>
                        </ul>
                    </div>
                )} */}
                {info && (
                    <Message
                        success
                        header='Password successful changed!'
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
                        // className={classnames('field', {error: !!values.errors.email})}
                        // error={classnames('true', { error: !!errors.email })}
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
    mutation userResetPassword( $password: String!, $confirmPassword: String! ) {
        userResetPassword(password: $password, confirmPassword: $confirmPassword) {
            id
            email
            token
        }
    }
`;


export default PasswordReset;
