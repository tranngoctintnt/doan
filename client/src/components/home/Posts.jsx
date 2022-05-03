import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PostCard from '../PostCard';
import CardHeader from './post_card/CardHeader';
import CardBody from './post_card/CardBody';
import CardFooter from './post_card/CardFooter';

const Posts = () => {
  const { homePosts } = useSelector((state) => state);
  return (
    <div className="container posts">
      {homePosts.posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
