import { useState, useEffect } from 'react';

export const useForm = ( callback , validators ) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [values, setValues] = useState({});
    const [ferrors, setFErrors] = useState({});

    useEffect(() => {
        if (Object.keys(ferrors).length === 0 && isSubmitting) {
            callback();
        }

    // eslint-disable-next-line
    }, [ferrors]);

    const onChange = (e) => {
        e.persist();
        setValues( values => ({ ...values, [e.target.name]: e.target.value }));
    };

    const onSubmit = (e) => {
        if(e) e.preventDefault();
        setIsSubmitting(true);
        setFErrors(validators(values));
    }

    return {
        onChange,
        onSubmit,
        values,
        ferrors
    }
}