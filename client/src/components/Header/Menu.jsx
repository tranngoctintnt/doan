import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/authAction';
import Avatar from '../Avatar';

import home1 from '../../images/home1.svg';
import chat from '../../images/chat.svg';
import explore from '../../images/explore.svg';
import bell from '../../images/bell.svg';
import user from '../../images/user.svg';
import bookmark from '../../images/bookmark.svg';
import logout1 from '../../images/logout.svg';

const Menu = () => {
  const navLinks = [
    {
      label: 'Home',
      icon: <img src={home1} style={{ width: '32px', height: '32px' }} alt="home" />,
      path: '/',
    },
    {
      label: 'Message',
      icon: <img src={chat} style={{ width: '32px', height: '32px' }} alt="chat" />,
      path: '/message',
    },
    {
      label: 'Discover',
      icon: <img src={explore} style={{ width: '32px', height: '32px' }} alt="explore" />,
      path: '/discover',
    },
    {
      label: 'Notify',
      icon: <img src={bell} style={{ width: '32px', height: '32px' }} alt="bell" />,
      path: '/notify',
    },
  ];

  const { auth } = useSelector((state) => state);
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
        <li className="nav-item dropdown">
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

            <Link to="/" className="dropdown-item">
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
