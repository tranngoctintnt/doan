import React, { useState } from 'react';
import Carousel from '../../Carousel';

const CardBody = ({ post }) => {
  //   const handleReadMore = ()
  return (
    <div className="card-body">
      {post.images.length > 0 && <Carousel images={post.images} id={post._id} />}
    </div>
  );
};

export default CardBody;
