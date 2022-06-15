import React, { useState } from 'react';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';

const UserCard = ({
  children,
  user,
  border,
  handleClose,
  setShowFollowers,
  setShowFollowing,
  msg,
}) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose();
    if (setShowFollowers) setShowFollowers(false);
    if (setShowFollowing) setShowFollowing(false);
  };

  // const [readMore, setReadMore] = useState(false);

  const showMsg = (user) => {
    return (
      <>
        <div>{user.text.length < 25 ? user.text + ' ' : user.text.slice(0, 25) + '...'}</div>
        {user.media.length > 0 && (
          <div>
            {user.media.length} <i className="fas fa-image" />
          </div>
        )}

        {user.call && (
          <span className="material-icons">
            {user.call.times === 0
              ? user.call.video
                ? 'videocam_off'
                : 'phone_disabled'
              : user.call.video
              ? 'video_camera_front'
              : 'call'}
          </span>
        )}
      </>
    );
  };

  return (
    <div
      className={`d-flex w-100 p-2 bg-transparent justify-content-between mt-1 rounded align-items-center ${border}`}
    >
      <div>
        <Link
          to={`/profile/${user._id}`}
          onClick={handleCloseAll}
          className="d-flex bg-transparent rounded align-items-center"
        >
          <Avatar src={user.avatar} size="big-avatar" />
          <div className="ml-2">
            <div className="d-block text-bold font-weight-border">{user.username}</div>

            <div style={{ opacity: 0.7 }}>{msg ? showMsg(user) : user.fullname}</div>
          </div>
        </Link>
      </div>

      {children}
    </div>
  );
};

export default UserCard;
