import React from 'react';
import { useSelector } from 'react-redux';

const LikeButton = ({ isLike, handleLike, handleUnLike }) => {
  return (
    <>
      {isLike ? (
        <i className="fa-solid fa-heart text-danger" onClick={handleUnLike} />
      ) : (
        <i className="fa-regular fa-heart" onClick={handleLike} />
      )}
    </>
  );
};

export default LikeButton;
