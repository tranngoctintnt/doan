import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import NoNotice from '../images/notice.png';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import moment from 'moment';
import { isReadNotify, NOTIFY_TYPES, deleteAllNotifies } from '../redux/actions/notifyAction';

const NotifyModal = () => {
  const { auth, notify } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleIsRead = (msg) => {
    dispatch(isReadNotify({ msg, auth }));
  };

  const handleSound = () => {
    dispatch({ type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound });
  };

  const handleDeleteAll = () => {
    const newArr = notify.data.filter((item) => item.isRead === false);
    if (newArr.length === 0) return dispatch(deleteAllNotifies(auth.token));

    return dispatch(deleteAllNotifies(auth.token));
  };

  return (
    <div className="rounded columns" style={{ minWidth: '450px' }}>
      <div className="d-flex px-3 justify-content-between align-items-center">
        <h5>Notification</h5>
        {notify.sound ? (
          <i
            className="fas fa-bell text-danger"
            style={{ fontSize: '1.2rem', cursor: 'pointer' }}
            onClick={handleSound}
          />
        ) : (
          <i
            className="fas fa-bell-slash text-danger"
            style={{ fontSize: '1.2rem', cursor: 'pointer' }}
            onClick={handleSound}
          />
        )}
      </div>
      <hr className="mt-0" />

      {notify.data.length === 0 && (
        <div style={{ minHeight: '300px' }} className=" bg-transparent w-100" />
      )}

      <div style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {notify.data.map((msg, index) => (
          <div key={index} className="px-3 mb-3">
            <Link
              to={`${msg.url}`}
              className="d-flex text-dark align-items-center"
              onClick={() => handleIsRead(msg)}
            >
              <Avatar src={msg.user.avatar} size="big-avatar" />

              <div className="mx-2 flex-fill">
                <div>
                  <span style={{ fontWeight: '500' }} className="mr-2">
                    {msg.user.username}
                  </span>
                  <span>{msg.text}</span>
                </div>
                {msg.content && <small>{msg.content.slice(0, 20)}...</small>}
              </div>
              {!msg.isRead && <i className="mx-3 fas fa-circle text-primary" />}

              {msg.image && (
                <div style={{ width: '30px' }}>
                  {msg.image.match(/video/i) ? (
                    <video src={msg.image} width="100%" />
                  ) : (
                    <Avatar src={msg.image} size="medium-avatar" />
                  )}
                </div>
              )}
            </Link>
            <small className="text-muted mt-2 ml-5 d-flex justify-content-between px-2">
              {moment(msg.createdAt).fromNow()}
            </small>
          </div>
        ))}
      </div>

      <hr className="my-1" />
      <div
        className="text-right text-danger mr-2"
        style={{ cursor: 'pointer' }}
        onClick={handleDeleteAll}
      >
        Delete All
      </div>
    </div>
  );
};

export default NotifyModal;
