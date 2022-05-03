import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '../Avatar';
import { getProfileUsers } from '../../redux/actions/profileAction';
import EditProfile from './EditProfile';
import FollowBtn from '../FollowBtn';
import Followers from './Followers';
import Following from './Following';

const Info = () => {
  const { id } = useParams();
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState([]);
  // const [postData, setPostData] = useState([]);

  const [onEdit, setOnEdit] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      dispatch(getProfileUsers({ users: profile.users, id, auth }));
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);
  return (
    <div className="info">
      {userData.map((user) => (
        <div className="info_container" key={user._id}>
          <div className="avatar_profile">
            <Avatar src={user.avatar} size="supper-avatar" />
          </div>
          <div className="info_content">
            <div className="info_content_title">
              <h2>{user.username}</h2>

              {user._id === auth.user._id ? (
                <button className="btn btn-outline-info" onClick={() => setOnEdit(true)}>
                  Edit Profile
                </button>
              ) : (
                <FollowBtn user={user} />
              )}
            </div>

            <div className="follow_btn">
              <span className="mr-5 followers" onClick={() => setShowFollowers(true)}>
                {user.followers.length} Followers
              </span>
              <span className="ml-4" onClick={() => setShowFollowing(true)}>
                {user.following.length} Following
              </span>
            </div>

            <div className="info_private">
              <h6 className="mt-1">{user.fullname}</h6>
              {/* <p className="m-0">{user.address}</p> */}
              {/* <p className="m-0">{user.email}</p> */}
              <a href={user.website}>{user.website}</a>
              <p>{user.story}</p>
            </div>
          </div>

          {onEdit && <EditProfile setOnEdit={setOnEdit} />}

          {showFollowers && (
            <Followers users={user.followers} setShowFollowers={setShowFollowers} />
          )}

          {showFollowing && (
            <Following users={user.following} setShowFollowing={setShowFollowing} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Info;
