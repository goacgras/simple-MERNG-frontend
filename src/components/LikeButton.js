import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import { LIKE_POST_MUTATION } from '../util/graphqlQuery';

import { Button, Label, Icon } from 'semantic-ui-react';

const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
    const [liked, setLiked] = useState(false);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id }
    });

    useEffect(() => {
        if (user && likes.find((like) => like.username === user.username)) {
            setLiked(true);
        } else setLiked(false);
    }, [user, likes]);

    const likeButton = user ? (
        liked ? (
            <Button color="teal">
                <Icon name="heart" />
            </Button>
        ) : (
            <Button color="teal" basic>
                <Icon name="heart" />
            </Button>
        )
    ) : (
        <Button as={Link} to="/login" color="teal" basic>
            <Icon name="heart" />
        </Button>
    );

    return (
        <Button as="div" labelPosition="right" onClick={likePost}>
            {likeButton}
            <Label basic color="teal" pointing="left">
                {likeCount}
            </Label>
        </Button>
    );
};

export default LikeButton;
