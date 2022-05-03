import React from 'react';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';

const UserCard = ({ children, user, border, handleClose, setShowFollowers, setShowFollowing }) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose();
    if (setShowFollowers) setShowFollowers(false);
    if (setShowFollowing) setShowFollowing(false);
  };
  return (
    <div
      className={`d-flex p-2 bg-transparent justify-content-between mt-1 rounded align-items-center ${border}`}
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

            <div style={{ opacity: 0.7 }}>{user.fullname}</div>
          </div>
        </Link>
      </div>

      {children}
    </div>
  );
};

export default UserCard;
