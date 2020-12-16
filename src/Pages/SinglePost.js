import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FETCH_POST_QUERY } from '../util/graphqlQuery';
import { useQuery } from '@apollo/react-hooks';
import { Button, Card, Grid, Icon, Image, Label } from 'semantic-ui-react';
import moment from 'moment';

import LikeButton from '../components/LikeButton';
import { AuthContext } from '../context/auth';
import DeleteButton from '../components/DeleteButton';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

const SinglePost = (props) => {
    const { postId } = useParams();
    const { user } = useContext(AuthContext);

    let getPost = '';
    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    });

    if (data) {
        getPost = data.getPost;
    }

    const deletePostCallback = () => {
        props.history.push('/');
    };

    let singlePostMarkup;
    if (!getPost) {
        singlePostMarkup = <p>Loading post...</p>;
    } else {
        const {
            id,
            body,
            createdAt,
            username,
            comments,
            likes,
            likeCount,
            commentCount
        } = getPost;

        singlePostMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                            size="small"
                            floated="right"
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>
                                    {moment(createdAt).fromNow()}
                                </Card.Meta>
                                <Card.Description>{body}</Card.Description>
                                <hr />
                                <Card.Content extra>
                                    <LikeButton
                                        user={user}
                                        post={{ id, likeCount, likes }}
                                    />
                                    <Button
                                        as="div"
                                        labelPosition="right"
                                        onClick={() =>
                                            console.log('comment on post')
                                        }
                                    >
                                        <Button basic color="blue">
                                            <Icon name="comments" />
                                        </Button>
                                        <Label
                                            basic
                                            color="blue"
                                            pointing="left"
                                        >
                                            {commentCount}
                                        </Label>
                                    </Button>
                                    {user && user.username === username && (
                                        <DeleteButton
                                            postId={id}
                                            callback={deletePostCallback}
                                        />
                                    )}
                                </Card.Content>
                            </Card.Content>
                        </Card>
                        {user && <CommentForm postId={id} />}
                        <CommentList
                            comments={comments}
                            user={user}
                            postId={id}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    return singlePostMarkup;
};

export default SinglePost;
