import { useMutation } from '@apollo/react-hooks';

import { Button, Form } from 'semantic-ui-react';

import { useForm } from '../util/hooks/hooks';
import { FETCH_POSTS_QUERY, ADD_NEW_POST } from '../util/graphqlQuery';

const PostForm = () => {
    const { onChangeHandler, onSubmitHandler, values } = useForm(
        addNewPostCallback,
        {
            body: ''
        }
    );

    const [addNewPost, { error }] = useMutation(ADD_NEW_POST, {
        update: (proxy, newData) => {
            //get data in cache
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            //add newData to data
            //add data to cache
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: { getPosts: [newData.data.createPost, ...data.getPosts] }
            });
            values.body = '';
        },
        onError: () => {},
        variables: values
    });

    function addNewPostCallback() {
        addNewPost();
    }

    return (
        <>
            <Form onSubmit={onSubmitHandler}>
                <h2>Create a Post: </h2>
                <Form.Field>
                    <Form.Input
                        placeholder="Hi World"
                        name="body"
                        onChange={onChangeHandler}
                        value={values.body}
                        error={error ? true : false}
                    />
                    <Button type="submit" color="teal">
                        Submit
                    </Button>
                </Form.Field>
            </Form>
            {error && (
                <div className="ui error message" style={{ marginBottom: 20 }}>
                    <ul className="list">
                        <li>{error.graphQLErrors[0].message}</li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default PostForm;
