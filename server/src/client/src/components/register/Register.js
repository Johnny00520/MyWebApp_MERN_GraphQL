import React, { useContext, useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from "@apollo/react-hooks";
import gql from 'graphql-tag';
import { useForm } from '../../utils/hooks';

import { AuthContext } from '../../context/auth';
import './Register.scss';

const Register = (props) => {
    const context = useContext(AuthContext);

    const [errors, setErrors] = useState({});
    const { onChange, onSubmit, values } = useForm(registerUser, {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    }) 

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        // update() is triggered after mutation succeeds.
        // proxy is rarely used
        update(proxy, result) {
            // console.log("proxy: ", proxy)

            console.log("result.data: ", result.data)
            const userData = result.data.userLogin;

            context.login(userData);

            console.log("props: ", props)
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

    function registerUser() {
        addUser()
    }

    return (
        <div className="register_page">
            <div className="form_container">

                <div className="form_wrapper">

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
                        <h1>Register</h1>
                        <Form.Input
                            label="Firstname"
                            placeholder="Firstname..."
                            name="firstname"
                            type="text"
                            value={values.firstname}
                            onChange={onChange}
                            error={errors.firstname ? true : false}
                        >
                        </Form.Input>
                        <Form.Input
                            label="Lastname"
                            placeholder="Lastname..."
                            name="lastname"
                            type="text"
                            value={values.lastname}
                            onChange={onChange}
                            error={errors.lastname ? true : false}
                        >
                        </Form.Input>
                        <Form.Input
                            label="email"
                            placeholder="email..."
                            name="email"
                            type="text"
                            value={values.email}
                            onChange={onChange}
                            error={errors.email ? true : false}
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
                        >
                        </Form.Input>
                        <Form.Input
                            label="Confirm Password"
                            placeholder="Confirm Password..."
                            name="confirmPassword"
                            type="password"
                            value={values.confirmPassword}
                            onChange={onChange}
                            error={errors.confirmPassword ? true : false}
                        >
                        </Form.Input>
                        <Button
                            type="submit"
                            primary
                            // floated="right"
                        >
                            Register
                        </Button>
                    </Form>

                </div>
            </div>
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $firstname: String!
        $lastname: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(registerInput: { 
            firstname: $firstname
            lastname: $lastname
            email: $email
            password: $password
            confirmPassword: $confirmPassword
        }) {
            id
            email
            firstname
            lastname
            createdAt
            token
        }
    }
`;

export default Register
