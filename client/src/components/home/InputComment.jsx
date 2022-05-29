import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createComment } from '../../redux/actions/commentAction';
import Icons from '../Icons';

const InputComment = ({ children, post, onReply, setOnReply }) => {
  const [content, setContent] = useState('');

  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      if (setOnReply) return setOnReply(false);
      return;
    }

    setContent('');

    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };

    dispatch(createComment({ post, newComment, auth, socket }));

    if (setOnReply) return setOnReply(false);
  };

  return (
    <form className="card-footer comment_input" onSubmit={handleSubmit}>
      {children}
      <Icons setContent={setContent} content={content} />

      <input
        type="text"
        placeholder="Add your comments..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button type="submit" className="postBtn mr-2">
        Post
      </button>
    </form>
  );
};

export default InputComment;
