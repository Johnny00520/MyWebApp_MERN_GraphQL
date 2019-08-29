import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from "@apollo/react-hooks";
import gql from 'graphql-tag';
import './Register.scss';

const Register = () => {
    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        // update() is triggered after mutation succeeds.
        // proxy is rarely used
        update(proxy, result) {
            console.log("result: ", result)
        },
        variables: {
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword
        }
        // variables: values
    })

    const onSubmit = (e) => {
        e.preventDefault();
        addUser()

    }

    

    return (
        <div className="register_page">
            <div className="form_container">

                <div className="form_wrapper">
                    <Form onSubmit={onSubmit} noValidate>
                        <h1>Register</h1>
                        <Form.Input
                            label="Firstname"
                            placeholder="Firstname..."
                            name="firstname"
                            type="text"
                            value={values.firstname}
                            onChange={onChange}
                        >
                        </Form.Input>
                        <Form.Input
                            label="Lastname"
                            placeholder="Lastname..."
                            name="lastname"
                            type="text"
                            value={values.lastname}
                            onChange={onChange}
                        >
                        </Form.Input>
                        <Form.Input
                            label="email"
                            placeholder="email..."
                            name="email"
                            type="text"
                            value={values.email}
                            onChange={onChange}
                        >
                        </Form.Input>
                        <Form.Input
                            label="Password"
                            placeholder="Password..."
                            name="password"
                            type="password"
                            value={values.password}
                            onChange={onChange}
                        >
                        </Form.Input>
                        <Form.Input
                            label="Confirm Password"
                            placeholder="Confirm Password..."
                            name="confirmPassword"
                            type="password"
                            value={values.confirmPassword}
                            onChange={onChange}
                        >
                        </Form.Input>
                        <Form.Button
                            type="submit"
                            primary
                            // floated="right"
                        >
                            Register
                        </Form.Button>
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
