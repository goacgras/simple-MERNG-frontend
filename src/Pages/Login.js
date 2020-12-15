import { useState, useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../util/hooks/hooks';
import { AuthContext } from '../context/auth';

import { Form, Button } from 'semantic-ui-react';

const Login = (props) => {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChangeHandler, onSubmitHandler, values } = useForm(signinUser, {
        username: '',
        password: ''
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            // console.log(userData);
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            // console.log(err);
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    });

    function signinUser() {
        loginUser();
    }

    // const onChangeHandler = (event) => {
    //     setValues({ ...values, [event.target.name]: event.target.value });
    // };

    // const onSubmitHandler = (e) => {
    //     e.preventDefault();
    //     addUser();
    // };

    return (
        <div className="form-container">
            <Form
                onSubmit={onSubmitHandler}
                noValidate
                className={loading ? 'loading' : ''}
            >
                <h1>Login</h1>
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
                    type="password"
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChangeHandler}
                />
                <Button type="submit" primary>
                    Login
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

const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            email
            token
            username
            createdAt
        }
    }
`;

export default Login;
