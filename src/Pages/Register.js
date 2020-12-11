import { useState, useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../util/hooks/hooks';
import { AuthContext } from '../context/auth';

import { Form, Button } from 'semantic-ui-react';

const Register = (props) => {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const { onChangeHandler, onSubmitHandler, values } = useForm(registerUser, {
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
    });

    // console.log(values);

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData } }) {
            console.log(userData);
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            // console.log(err.graphQLErrors[0].extensions.errors);
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    });

    function registerUser() {
        addUser();
    }

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
