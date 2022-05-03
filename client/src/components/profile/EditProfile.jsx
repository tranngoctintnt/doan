import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import '../../styles/editProfile.css';
import { checkImage } from '../../utils/imageUpload';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { updateProfileUser } from '../../redux/actions/profileAction';

const EditProfile = ({ user, setOnEdit }) => {
  const initState = {
    fullname: '',
    mobile: '',
    address: '',
    website: '',
    story: '',
    gender: '',
  };

  const [userData, setUserData] = useState(initState);
  const { fullname, mobile, address, website, story, gender } = userData;

  const [avatar, setAvatar] = useState('');

  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file);
    if (err) return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setAvatar(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileUser({ userData, avatar, auth }));
  };

  return (
    <div className="edit_profile">
      <form onSubmit={handleSubmit} className="container rounded mt-5 bg-white">
        <div className="row">
          <div className=" info col-md-4 border-right">
            <div className="info_avatar d-flex flex-column align-items-center text-center">
              <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt="avatar" />
              <span>
                <i className="fas fa-camera" />
                <p>Change</p>
                <input
                  type="file"
                  name="file"
                  id="file_up"
                  accept="image/*"
                  onChange={changeAvatar}
                />
              </span>
            </div>
            <div className="d-flex flex-column align-items-center text-center">
              {/* <span className="font-weight-bold" value="fullname"></span>
              <span className="text-black-50">{user.email}</span>
              <span>{user.address}</span> */}
            </div>
          </div>
          <div className="col-md-8">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div
                  className="d-flex flex-row align-items-center back"
                  onClick={() => setOnEdit(false)}
                >
                  <i className="fa fa-long-arrow-left mr-1 mb-1"></i>
                  <h6>Back to home</h6>
                </div>
                <h6 className="text-right">Edit Profile</h6>
              </div>
              <div className="row mt-2">
                <div className="col-md-6 position-relative">
                  <input
                    type="text"
                    className="form-control"
                    id="fullname"
                    placeholder="Full Name"
                    name="fullname"
                    value={fullname}
                    onChange={handleInputChange}
                  />
                  {/* <small
                    className="position-absolute"
                    styles={{ top: '50%', right: '5px', transform: 'translateY(-50%)' }}
                  >
                    {fullname.length}/25
                  </small> */}
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    placeholder="Mobile"
                    name="mobile"
                    value={mobile}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Address"
                    name="address"
                    value={address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    id="website"
                    placeholder="Website"
                    name="website"
                    value={website}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <textarea
                    className="form-control"
                    cols="30"
                    rows="4"
                    placeholder="Story"
                    name="story"
                    value={story}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <select
                    className="custom-select text-capitalize"
                    name="gender"
                    id="gender"
                    value={gender}
                    onChange={handleInputChange}
                  >
                    <option value="male">Male</option>
                    <option value="female">FeMale</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              {/* <div className="row mt-3 input-group-prepend px-0 mb-4"></div> */}
              <div className="mt-5 text-right">
                <button className="btn btn-primary profile-button back" type="submit">
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
