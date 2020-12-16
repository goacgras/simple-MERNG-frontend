import { Grid, Transition } from 'semantic-ui-react';

import PostCard from './PostCard';

const PostList = ({ posts, commentOnPostHandler }) => {
    // console.log('[POSTLIST]');
    return (
        <>
            <Transition.Group>
                {posts.map((post) => (
                    <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                        <PostCard
                            post={post}
                            commentOnPostHandler={commentOnPostHandler}
                        />
                    </Grid.Column>
                ))}
            </Transition.Group>
        </>
    );
};

export default PostList;
