import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
// export const useForm = (callback, initialState = { errors: {} }) => {
    const [values, setValues] = useState(initialState);

    const onChange = (e) => {

        // if(!!values.email[e.target.name]) {
        //     let errors = Object.assign({}, values.errors);
        //     delete errors[e.target.name];

        //     setValues({ ...values, [e.target.name]: e.target.value, errors })
        // } else {
        //     setValues({ ...values, [e.target.name]: e.target.value })
        // }

        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        callback();
    }

    return {
        onChange,
        onSubmit,
        values
    }
}