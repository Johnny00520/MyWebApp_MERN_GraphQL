import React, { useState } from 'react';
import { contactPageValidatorInput } from '../../utils/validators';
import { useForm } from '../../utils/hooks';
import { useMutation } from "@apollo/react-hooks";
import { Form, Button, Message } from 'semantic-ui-react';
import Mapbox from './Mapbox';
import gql from 'graphql-tag';

import './Contact.scss';

const Contact = (props) => {
    const [berrors, setBErrors] = useState({});
    const [info, setInfo] = useState(false);

    const { onChange, onSubmit, values, ferrors } = useForm(contactPageCallback, contactPageValidatorInput);

    const [contactReqSend, { loading }] = useMutation(CONTACT_PAGE_USER, {
        update(proxy, result) {
            if(result.data) setInfo({ info: true })
        },
        variables: {
            email: values.email,
            firstname: values.firstname,
            lastname: values.lastname,
            content: values.content
        },
        onError(err) {
            // debugger
            console.log("err.graphQLErrors[0].exception: ", err.graphQLErrors[0].extensions.exception.errors)
            setBErrors(err.graphQLErrors[0].extensions.exception.errors)
        }
    })

    function contactPageCallback() {
        contactReqSend()
    }

    return (
        <div className="contact_page">
            <div className="contact_page_container">
                <div className="contact_page_wrapper">

                    <Mapbox />

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
                            header='Your email has been sent to Johnny. Please give between 24 hours to 48 hours to reply!'
                        />
                    )}

                    <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                    <h1>Contact Johnny Cheng...</h1>
                        <Form.Input
                            label="First name"
                            placeholder={ferrors.firstname ? ferrors.firstname : "First name..."}
                            name="firstname"
                            type="text"
                            value={values.firstname || ""}
                            onChange={onChange}
                            error={berrors.firstname || ferrors.firstname ? true : false}

                            icon='user'
                            iconPosition='left'
                        />
                        <Form.Input
                            label="Last name"
                            placeholder={ferrors.lastname ? ferrors.lastname : "Last name..."}
                            name="lastname"
                            type="text"
                            value={values.lastname || ""}
                            onChange={onChange}
                            error={berrors.lastname || ferrors.lastname ? true : false}

                            icon='user'
                            iconPosition='left'
                        />
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
                        <Form.TextArea
                            label="Message"
                            placeholder={ferrors.email ? ferrors.email : "What do you want to tell me...?"}
                            name="content"
                            type="text"
                            value={values.content || ""}
                            onChange={onChange}
                            error={berrors.content || ferrors.content ? true : false}
                        />

                        <Button type="submit" primary>Send</Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

const CONTACT_PAGE_USER = gql`
    mutation contactPageSendEmail (
        $firstname: String!
        $lastname: String!
        $email: String!
        $content: String!
    ) {
        contactPageSendEmail(contactPageInput: {
            firstname: $firstname
            lastname: $lastname
            email: $email
            content: $content
        }) {
            firstname
            lastname
            email
        }
    }
    
`;

export default Contact;
