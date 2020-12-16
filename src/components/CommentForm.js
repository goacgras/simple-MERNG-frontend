import { useRef } from 'react';
import { useForm } from '../util/hooks/hooks';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_COMMENT_MUTATION } from '../util/graphqlQuery';

import { Card, Form } from 'semantic-ui-react';

const CommentForm = ({ postId }) => {
    const commentInputRef = useRef(null);
    const { onChangeHandler, onSubmitHandler, values } = useForm(
        submitCommentCallback,
        {
            body: ''
        }
    );

    const [submitComment] = useMutation(CREATE_COMMENT_MUTATION, {
        update: () => {
            values.body = '';
            commentInputRef.current.blur();
        },
        variables: {
            postId,
            body: values.body
        }
    });

    function submitCommentCallback() {
        submitComment();
    }

    return (
        <Card fluid>
            <Card.Content>
                <p>Post a comment</p>
                <Form>
                    <div className="ui action input fluid">
                        <input
                            type="text"
                            placeholder="Comment..."
                            name="body"
                            value={values.body}
                            onChange={onChangeHandler}
                            ref={commentInputRef}
                        />
                        <button
                            className="ui button teal"
                            type="submit"
                            disabled={values.body.trim() === ''}
                            onClick={onSubmitHandler}
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            </Card.Content>
        </Card>
    );
};

export default CommentForm;
