import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import PostCard from '../components/PostCard';

// import '../App.css';

const Home = () => {
    let posts = '';
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);

    if (data) {
        posts = { data: data.getPosts };
    }

    const likePostHandler = () => {
        console.log('Like');
    };

    const commentOnPostHandler = () => {
        console.log('Comment');
    };

    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <p>Loading Posts...</p>
                ) : (
                    posts.data &&
                    posts.data.map((post) => (
                        <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                            <PostCard
                                post={post}
                                likePostHandler={likePostHandler}
                                commentOnPostHandler={commentOnPostHandler}
                            />
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
    );
};

const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id
            body
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`;

export default Home;