import { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { Form, Button } from 'semantic-ui-react';

const Register = (props) => {
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
    });

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, result) {
            console.log(result);
            props.history.push('/');
        },
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.errors);
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    });

    const onChangeHandler = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        addUser();
    };

    return (
        <div className="form-container">
            <Form
                onSubmit={onSubmitHandler}
                noValidate
                className={loading ? 'loading' : ''}
            >
                <h1>Register</h1>
                <Form.Input
                    type="text"
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChangeHandler}
                />
                <Form.Input
                    type="email"
                    label="Email"
                    placeholder="Email..."
                    name="email"
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={onChangeHandler}
                />
                <Form.Input
                    type="password"
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChangeHandler}
                />
                <Form.Input
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm Password..."
                    name="confirmPassword"
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChangeHandler}
                />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((value) => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

export default Register;
