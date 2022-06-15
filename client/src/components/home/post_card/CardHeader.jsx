import React, { useState } from 'react';
import Avatar from '../../Avatar';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { GLOBALTYPES } from '../../../redux/actions/globalTypes';
import { deletePost } from '../../../redux/actions/postAction';
import { deleteComment } from '../../../redux/actions/commentAction';
import { BASE_URL } from '../../../utils/config';

const CardHeader = ({ post }) => {
  const { auth, socket } = useSelector((state) => state);

  const [isDelete, setisDelete] = useState(false);
  const dispatch = useDispatch();

  const history = useNavigate();

  const handleEditPost = () => {
    dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
  };

  const handleDeletePost = () => {
    dispatch(deletePost({ post, auth, socket }));

    return history('/');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
  };

  return (
    <div className="card_header d-flex justify-content-between">
      <div className="user d-flex ">
        <div className="profile-photo">
          <Avatar src={post.user.avatar} size="medium-avatar" />
        </div>

        <div className="ingo">
          <h6 className="m-0">
            <Link to={`/profile/${post.user._id}`} className="text-dark">
              {post.user.fullname}
            </Link>
          </h6>
          <small className="text-muted">{moment(post.createdAt).fromNow()}</small>
        </div>
      </div>

      <div className="nav-item dropdown">
        <span className="material-icons" id="moreLink" data-toggle="dropdown">
          more_horiz
        </span>

        <div className="dropdown-menu">
          {auth.user._id === post.user._id && (
            <>
              <div className="dropdown-item" onClick={handleEditPost}>
                <span className="material-icons">create</span> Edit Post
              </div>

              <div className="dropdown-item" onClick={handleDeletePost}>
                <span className="material-icons">delete_outline</span> Remove Post
              </div>
            </>
          )}

          <div className="dropdown-item" onClick={handleCopyLink}>
            <span className="material-icons">content_copy</span> Copy Link
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
