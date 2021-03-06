import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPost } from '../../redux/actions/postAction';
import LoadIcon from '../../images/loading.gif';
import PostCard from '../../components/PostCard';
import PostDetail from '../../components/PostDetail';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [postDetail, setPostDetail] = useState(false);

  const { auth, detailPost } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost({ detailPost, id, auth }));

    if (detailPost.length > 0) {
      const newArr = detailPost.filter((post) => post._id === id);
      setPost(newArr);
    }
  }, [detailPost, dispatch, id, auth]);

  return (
    <div className="post row container">
      {post.length === 0 && (
        <img
          src={LoadIcon}
          alt="loading"
          style={{ width: '88px' }}
          className="d-block mx-auto my-4"
        />
      )}

      {post.map((item) => (
        <PostDetail key={item._id} post={item} />
      ))}

      {/* {post.map((item) => (
        <PostCard key={item._id} post={item} />
      ))} */}
    </div>
  );
};

export default Post;
