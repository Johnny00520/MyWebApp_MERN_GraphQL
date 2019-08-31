import React, { useContext, useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from "@apollo/react-hooks";
import gql from 'graphql-tag';
import { useForm } from '../../utils/hooks';
import { AuthContext } from '../../context/auth';
import './Login.scss';

const Login = (props) => {
    const context = useContext(AuthContext);

    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values} = useForm(loginUserCallback, {
        email: "",
        password: ""
    })

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        // update() is triggered after mutation succeeds.
        // proxy is rarely used
        update(proxy, result) {

            console.log("result.data: ", result.data)
            const userData = result.data.userLogin;

            context.login(userData);

            console.log("props in login: ", props)
            props.history.push('/');
        },
        // variables: values
        variables: {
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword
        },
        onError(err) {
            console.log("err.graphQLErrors[0].exception: ", err.graphQLErrors[0].exception)
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        }
        
    })

    function loginUserCallback() {
        loginUser()
    }

    return (
        <div className="login_section">
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((value) => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}

            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1>Login</h1>
                
                <Form.Input
                    label="email"
                    placeholder="email..."
                    name="email"
                    type="text"
                    value={values.email}
                    onChange={onChange}
                    error={errors.email ? true : false}

                    icon='envelope'
                    iconPosition='left'
                >
                </Form.Input>
                <Form.Input
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={onChange}
                    error={errors.password ? true : false}

                    icon='lock'
                    iconPosition='left'
                >
                </Form.Input>
                
                <Button
                    type="submit"
                    primary
                    // floated="right"
                >
                    Login
                </Button>
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

export default Login
