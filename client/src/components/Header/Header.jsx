import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import Search from './Search';
import '../../styles/header.css';
// import avatar from '../../images/avatar.svg';

const Header = () => {
  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg justify-content-around align-middle">
        <div className="navbar-title">
          <Link to="/" className="log" onClick={() => window.scrollTo({ top: 0 })}>
            <h1>Social</h1>
          </Link>
        </div>
        <div className="navbar-search">
          <Search />
        </div>

        <div className="navbar-menu">
          <Menu />
        </div>
      </nav>
    </div>
  );
};

export default Header;
