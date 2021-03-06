import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PostThumb = ({ posts, result }) => {
  if (result === 0) return <h2 className="text-center text-danger">No Post</h2>;

  return (
    <div className="post_thumb container" style={{ marginBottom: '68px' }}>
      {posts.map((post) => (
        <Link key={post._id} to={`/post/${post._id}`}>
          <div className="post_thumb_display">
            {post.images[0].url.match(/video/i) ? (
              <video controls src={post.images[0].url} alt={post.images[0].url} />
            ) : (
              <img src={post.images[0].url} alt={post.images[0].url} />
            )}

            <div className="post_thumb_menu">
              <i className="fas fa-heart">
                {' '}
                <span> {post.likes.length} </span>
              </i>
              <i className="fas fa-comment">
                <span> {post.comments.length}</span>
              </i>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostThumb;
