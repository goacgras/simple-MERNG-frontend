import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Button, Icon, Confirm } from 'semantic-ui-react';
import {
    DELETE_POST_MUTATION,
    FETCH_POSTS_QUERY,
    DELETE_COMMENT_MUTATION
} from '../util/graphqlQuery';
import GrasPopup from './GrasPopup';

const DeleteButton = ({ postId, callback, commentId }) => {
    const [confimOpen, setConfirmOpen] = useState(false);

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
    const [deletePostOrMutation] = useMutation(mutation, {
        variables: {
            postId,
            commentId
        },
        update: (proxy) => {
            setConfirmOpen(false);

            if (!commentId) {
                //get data in cache
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                });
                // data.getPosts = data.getPosts.filter(p => p.id !== postId)
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: {
                        getPosts: data.getPosts.filter((p) => p.id !== postId)
                    }
                });
            }

            if (callback) callback();
        }
    });

    return (
        <>
            <GrasPopup content={commentId ? 'Delete comment' : 'Delete post'}>
                <Button
                    as="div"
                    color="red"
                    floated="right"
                    onClick={() => setConfirmOpen(true)}
                >
                    <Icon name="trash" style={{ margin: 0 }} />
                </Button>
            </GrasPopup>

            <Confirm
                // width={5}
                open={confimOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePostOrMutation}
            />
        </>
    );
};

export default DeleteButton;
