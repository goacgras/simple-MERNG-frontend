import gql from 'graphql-tag';
import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Button, Form } from 'semantic-ui-react';

import { useForm } from '../util/hooks/hooks';

const PostForm = () => {
    const { onChangeHandler, onSubmitHandler, values } = useForm(
        addNewPostCallback,
        {
            body: ''
        }
    );

    const [addNewPost, { error }] = useMutation(ADD_NEW_POST, {
        update: (_, data) => {
            console.log(data);
            values.body = '';
        },
        variables: values
    });

    function addNewPostCallback() {
        addNewPost();
    }

    return (
        <Form onSubmit={onSubmitHandler}>
            <h2>Create a Post: </h2>
            <Form.Field>
                <Form.Input
                    placeholder="Hi World"
                    name="body"
                    onChange={onChangeHandler}
                    value={values.body}
                />
                <Button type="submit" color="teal">
                    Submit
                </Button>
            </Form.Field>
        </Form>
    );
};

const ADD_NEW_POST = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id
            body
            createdAt
            username
            likes {
                id
                username
                createdAt
            }
            likeCount
            comments {
                id
                body
                username
                createdAt
            }
            commentCount
        }
    }
`;

export default PostForm;
