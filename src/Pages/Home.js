import { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid } from 'semantic-ui-react';

import PostForm from '../components/PostForm';
// import PostCard from '../components/PostCard';
import { AuthContext } from '../context/auth';
import { FETCH_POSTS_QUERY } from '../util/graphqlQuery';
import PostList from '../components/PostList';

const Home = () => {
    const { user } = useContext(AuthContext);

    let posts = '';
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);

    if (data) {
        posts = { data: data.getPosts };
    }

    const commentOnPostHandler = () => {
        console.log('Comment');
    };

    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
                {loading ? (
                    <p>Loading posts</p>
                ) : (
                    <PostList
                        posts={posts.data}
                        commentOnPostHandler={commentOnPostHandler}
                    />
                )}
            </Grid.Row>
        </Grid>
    );
};

export default Home;
