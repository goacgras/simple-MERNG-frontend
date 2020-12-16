import { memo } from 'react';
import moment from 'moment';

import DeleteButton from './DeleteButton';

import { Card } from 'semantic-ui-react';

const CommentList = memo(({ comments, user, postId }) => {
    console.log('[COMMENT LIST RENDER]');
    return (
        <>
            {comments.map((comment) => (
                <Card fluid key={comment.id}>
                    <Card.Content>
                        {user && user.username === comment.username && (
                            <DeleteButton
                                postId={postId}
                                commentId={comment.id}
                            />
                        )}
                        <Card.Header>{comment.username}</Card.Header>
                        <Card.Meta>
                            {moment(comment.createdAt).fromNow()}
                        </Card.Meta>
                        <Card.Description>{comment.body}</Card.Description>
                    </Card.Content>
                </Card>
            ))}
        </>
    );
});

export default CommentList;
