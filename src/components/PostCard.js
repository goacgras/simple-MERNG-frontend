import { useContext, memo } from 'react';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import GrasPopup from './GrasPopup';

const PostCard = ({
    commentOnPostHandler,
    post: { body, createdAt, id, username, likeCount, commentCount, likes }
}) => {
    const { user } = useContext(AuthContext);

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated="right"
                    size="mini"
                    src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>
                    {moment(createdAt).fromNow(true)}
                </Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <GrasPopup content="Comment on post">
                    <Button
                        as={Link}
                        to={`/posts/${id}`}
                        labelPosition="right"
                        onClick={commentOnPostHandler}
                    >
                        <Button color="blue" basic>
                            <Icon name="comments" />
                        </Button>
                        <Label basic color="blue" pointing="left">
                            {commentCount}
                        </Label>
                    </Button>
                </GrasPopup>

                {user && user.username === username && (
                    <DeleteButton postId={id} />
                )}
            </Card.Content>
        </Card>
    );
};

const areEqual = (prevState, nextState) => {
    if (prevState.post.likeCount === nextState.post.likeCount) {
        return true;
    } else {
        return false;
    }
};

export default memo(PostCard, areEqual);
