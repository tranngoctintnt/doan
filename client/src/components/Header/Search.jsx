import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDataAPI } from '../../utils/fetchData';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import UserCard from '../UserCard';

const Search = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (search) {
      getDataAPI(`search?username=${search}`, auth.token)
        .then((res) => setUsers(res.data.users))
        .catch((err) => {
          dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
        });
    } else {
      setUsers([]);
    }
  }, [search, auth.token, dispatch]);

  const handleClose = () => {
    setSearch('');
    setUsers([]);
  };

  return (
    <form className="search_form">
      <div className="search-bar">
        {/* <i className="uil uil-search"></i> */}
        <input
          autoComplete="off"
          type="search"
          name="search"
          value={search}
          id="search"
          placeholder="Search for creators"
          onChange={(e) => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))}
        />
      </div>
      {/* <input type="text" name="search" value={search} id="search" title="Enter to Search"
            onChange={e => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))} />

      <div className="search_icon" style={{ opacity: search ? 0 : 0.3 }}>
        <span className="material-icons">search</span>
        <span>Enter to Search</span>
      </div> */}

      <div
        className="close_search"
        onClick={handleClose}
        style={{ opacity: users.length === 0 ? 0 : 1 }}
      >
        &times;
      </div>

      <div className="users">
        {search &&
          users.map((user) => (
            <UserCard key={user._id} user={user} border="border" handleClose={handleClose} />
          ))}
      </div>
    </form>
  );
};

export default Search;
