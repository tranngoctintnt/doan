import React from 'react';

import CardHeader from './home/post_card/CardHeader';
import CardBody from './home/post_card/CardBody';
import CardFooter from './home/post_card/CardFooter';

import Comments from './home/Comments';
import InputComment from './home/InputComment';

const PostDetail = ({ post, setPostDetail }) => {
  return (
    <div className="card detail my-1 container">
      <div className="col-md-6 ">
        <CardBody post={post} />
      </div>

      <div className="col-md-6 p-3 ml-1">
        <CardHeader post={post} />
        <CardFooter post={post} />

        <Comments post={post} />
        <InputComment post={post} />
      </div>
    </div>
  );
};

export default PostDetail;
