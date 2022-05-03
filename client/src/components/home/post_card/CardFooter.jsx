import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { likePost, unLikePost, savePost, unSavePost } from '../../../redux/actions/postAction';
import LikeButton from '../../LikeButton';

const CardFooter = ({ post }) => {
  const [readMore, setReadMore] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const [isShare, setIsShare] = useState(false);

  const { auth, theme, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [saved, setSaved] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);

  // Likes
  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, auth.user._id]);

  const handleLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(likePost({ post, auth, socket }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(unLikePost({ post, auth, socket }));
    setLoadLike(false);
  };

  return (
    <div className="card_footer">
      <div className="action-buttons">
        <div className="interaction--buttons">
          <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />
          <span>
            <Link to={`/post/${post._id}`} className="text-dark">
              <i className="far fa-comment" />
            </Link>
          </span>

          <span>
            <i className="fa-regular fa-paper-plane"></i>{' '}
          </span>
        </div>

        <div className="bookmark">
          <span>
            <i className="uil uil-bookmark"></i>
          </span>
        </div>
      </div>

      <div className="liked-by">
        {/* <span>
          <img src="./images/profile-1.png" alt="" />
        </span> */}

        {/* Like by <b>{post.likes.user.username}</b>and <b>{post.likes.length - 1} others</b> */}
        <h6 style={{ cursor: 'pointer' }}>{post.likes.length} likes</h6>
        <h6 style={{ cursor: 'pointer' }}>{post.comments.length} comments</h6>
      </div>

      <div className="card_footer-content">
        <span>
          {post.content.length < 60
            ? post.content
            : readMore
            ? post.content + ' '
            : post.content.slice(0, 60) + ' ...'}
        </span>

        {post.content.length > 60 && (
          <span className="readMore text-bold" onClick={() => setReadMore(!readMore)}>
            {readMore ? ' ' : ' Read More'}
          </span>
        )}
      </div>
    </div>
  );
};

export default CardFooter;
