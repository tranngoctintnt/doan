import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { likePost, unLikePost, savePost, unSavePost } from '../../../redux/actions/postAction';
import LikeButton from '../../LikeButton';
import ShareModal from '../../ShareModal';
import { BASE_URL } from '../../../utils/config';

const CardFooter = ({ post }) => {
  const [readMore, setReadMore] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const [isShare, setIsShare] = useState(false);

  const { auth, socket } = useSelector((state) => state);
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

  // Saved;
  useEffect(() => {
    if (auth.user.saved.find((id) => id === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth.user.saved, post._id]);

  const handleSavePost = async () => {
    if (saveLoad) return;

    setSaveLoad(true);
    await dispatch(savePost({ post, auth }));
    setSaveLoad(false);
  };

  const handleUnSavePost = async () => {
    if (saveLoad) return;

    setSaveLoad(true);
    await dispatch(unSavePost({ post, auth }));
    setSaveLoad(false);
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
            <i className="fa-regular fa-paper-plane" onClick={() => setIsShare(!isShare)}></i>
          </span>
        </div>

        {saved ? (
          <div style={{ cursor: 'pointer' }} className="bookmark">
            <span>
              <i className="fas fa-bookmark text-dark" onClick={handleUnSavePost}></i>
            </span>
          </div>
        ) : (
          <div style={{ cursor: 'pointer' }} className="bookmark">
            <span>
              <i className="far fa-bookmark" onClick={handleSavePost}></i>
            </span>
          </div>
        )}
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

      {/* <hr /> */}

      {isShare && <ShareModal url={`${BASE_URL}/post/${post._id}`} />}
    </div>
  );
};

export default CardFooter;
