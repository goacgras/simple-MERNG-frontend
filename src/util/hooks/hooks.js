import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const onChangeHandler = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        callback();
    };

    return {
        values,
        onChangeHandler,
        onSubmitHandler
    };
};
