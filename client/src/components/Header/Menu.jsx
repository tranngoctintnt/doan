import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authAction';
import { savePost } from '../../redux/actions/postAction';

import Avatar from '../Avatar';
import NotifyModal from '../NotifyModal';

import home from '../../images/home.png';
import message from '../../images/messenger.png';
import explore from '../../images/explore.png';
import bell from '../../images/bell.png';
import user from '../../images/user.svg';
import bookmark from '../../images/bookmark.svg';
import logout1 from '../../images/logout.svg';

const Menu = () => {
  const navLinks = [
    {
      label: 'Home',
      icon: <img src={home} style={{ width: '32px', height: '32px' }} alt="home" />,
      path: '/',
    },
    {
      label: 'Message',
      icon: <img src={message} style={{ width: '32px', height: '32px' }} alt="chat" />,
      path: '/message',
    },
    {
      label: 'Discover',
      icon: <img src={explore} style={{ width: '32px', height: '32px' }} alt="explore" />,
      path: '/discover',
    },
    // {
    //   label: 'Notify',
    //   icon: <img src={bell} style={{ width: '32px', height: '32px' }} alt="bell" />,
    //   path: '/notify',
    // },
  ];

  const { auth, notify } = useSelector((state) => state);

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isActive = (pn) => {
    if (pn === pathname) return 'active';
  };
  return (
    <div className="menu">
      <ul className="navbar-nav flex-row">
        {navLinks.map((link, index) => (
          <li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
            <Link to={link.path} className="nav-link" href="#">
              <span>{link.icon}</span>
            </Link>
          </li>
        ))}

        <li className="nav-item dropdown" style={{ marginRight: '6px', opacity: 1 }}>
          <span
            className="nav-link position-relative"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img
              src={bell}
              style={{
                width: '32px',
                height: '32px',
                color: notify.data.length > 0 ? 'crimson' : '',
              }}
              alt="bell"
            />
            <h6
              style={{
                top: '4px',
                right: '3px',
                color: 'white',
                width: '20px',
                height: '20px',
              }}
              className="notify_length text-center rounded-circle bg-danger bg-gradient position-absolute"
            >
              {notify.data.length}
            </h6>
          </span>

          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdown"
            style={{ transform: 'translateX(75px)' }}
          >
            <NotifyModal />
          </div>
        </li>

        <li className="nav-item dropdown" style={{ opacity: 1 }}>
          <span
            className="nav-link"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {/* <img src={auth.user.avatar} alt="avatar" className="avatar" /> */}
            <Avatar src={auth.user.avatar} size="medium-avatar" />
          </span>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link to={`/profile/${auth.user._id}`} className="dropdown-item">
              <img src={user} style={{ width: '23px', height: '23px' }} alt="user" />
              Profile
            </Link>

            <Link to="/saved" className="dropdown-item">
              <img src={bookmark} style={{ width: '23px', height: '23px' }} alt="bookmark" />
              Bookmarks
            </Link>
            <div className="dropdown-divider"></div>

            <Link to="/" className="dropdown-item" onClick={() => dispatch(logout())}>
              <img src={logout1} style={{ width: '23px', height: '23px' }} alt="logout" />
              Logout
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
