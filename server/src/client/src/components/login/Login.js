import React, { useContext, useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from "@apollo/react-hooks";
import { useForm } from '../../utils/hooks';
import { AuthContext } from '../../context/auth';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import './Login.scss';

import { loginValidatorsInput } from '../../utils/validators';

const Login = (props) => {
    const context = useContext(AuthContext);
    const [berrors, setBErrors] = useState({});

    const { onChange, onSubmit, values, ferrors} = useForm(loginUserCallback, loginValidatorsInput);

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        // update() is triggered after mutation succeeds.
        // proxy is rarely used
        update(proxy, result) {

            // console.log("result.data: ", result.data)
            const userData = result.data.userLogin;
            
            props.history.push('/');
            // console.log("props in login: ", props)
            context.login(userData);

        },
        // variables: values
        variables: {
            // firstname: values.firstname,
            // lastname: values.lastname,
            email: values.email,
            password: values.password,
            // confirmPassword: values.confirmPassword
        },
        onError(err) {
            // debugger
            console.log("err.graphQLErrors[0].exception: ", err.graphQLErrors[0].extensions.exception)
            setBErrors(err.graphQLErrors[0].extensions.exception.errors)
            // loginValidatorsInput(err)
        }
        
    })

    function loginUserCallback() {
        loginUser()
    }

    return (
        <div className="login_section">
            {Object.keys(berrors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {/* {Object.values(errors).map((value) => (
                            <li key={value}>{value}</li>
                        ))} */}

                        {Object.values(berrors).map((value) => {
                            // debugger
                            console.log("value: ", value)
                            return <li key={value}>{value}</li>
                        })}
                    </ul>
                </div>
            )}

            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1>Login</h1>
                
                <Form.Input
                    label="Email"
                    placeholder={ferrors.email ? ferrors.email : "Email..."}
                    name="email"
                    type="text"
                    value={values.email || ''}
                    onChange={onChange}
                    error={berrors.email || ferrors.email ? true : false}
                    icon='envelope'
                    iconPosition='left'
                >
                </Form.Input>
                <Form.Input
                    label="Password"
                    placeholder={ferrors.password ? ferrors.password : "Password..."}
                    name="password"
                    type="password"
                    value={values.password || ''}
                    onChange={onChange}
                    error={berrors.password || ferrors.password ? true : false}

                    icon='lock'
                    iconPosition='left'
                >
                </Form.Input>
                <div className="login_options">
                    <Button type="submit" primary style={{ width: "50%"}}>Login</Button>

                    <p>
                        <Link to="/forgot_password">Forgot password ?</Link>
                    </p>
                </div>

            </Form>

        </div>
    )
}

const LOGIN_USER = gql`
    mutation userLogin( $email: String! $password: String!
    ) { userLogin( email: $email password: $password ) {
            id
            email
            firstname
            lastname
            createdAt
            token
        }
    }
`;

export default Login;
