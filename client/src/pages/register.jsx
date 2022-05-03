import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../redux/actions/authAction';

// import '../styles/login.css';
import wave from '../images/wave.png';
import bg from '../images/bg.svg';

const Register = () => {
  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    fullname: '',
    username: '',
    email: '',
    password: '',
    cf_password: '',
    gender: 'male',
  };
  const [userData, setUserData] = useState(initialState);
  const { fullname, username, email, password, cf_password } = userData;

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  useEffect(() => {
    if (auth.token) navigate('/');
  }, [auth.token, navigate]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };
  return (
    <div>
      <img className="wave" src={wave} alt="wave" />
      <div className="container-login">
        <div className="img">
          <img src={bg} alt="background" />
        </div>
        <div className="login-content">
          <form onSubmit={handleSubmit}>
            {/* <img src={avatar} /> */}
            <h2 className="title">Welcome</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <input
                  placeholder="Enter your full name"
                  type="text"
                  className="input"
                  name="fullname"
                  onChange={handleChangeInput}
                  value={fullname}
                  style={{ background: `${alert.fullname ? '#fd2d6a14' : ''}` }}
                />
              </div>
            </div>
            <small className="form-text text-danger">{alert.fullname ? alert.fullname : ''}</small>

            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <input
                  placeholder="Enter your user name"
                  type="text"
                  className="input"
                  name="username"
                  onChange={handleChangeInput}
                  value={username.toLowerCase().replace(/ /g, '')}
                  style={{ background: `${alert.username ? '#fd2d6a14' : ''}` }}
                />
              </div>
            </div>
            <small className="form-text text-danger">{alert.username ? alert.username : ''}</small>

            <div className="input-div one">
              <div className="i">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="div">
                <input
                  placeholder="Enter your email"
                  type="email"
                  className="input"
                  name="email"
                  onChange={handleChangeInput}
                  value={email}
                  style={{ background: `${alert.email ? '#fd2d6a14' : ''}` }}
                />
              </div>
            </div>
            <small className="form-text text-danger">{alert.email ? alert.email : ''}</small>

            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <input
                  placeholder="Enter your password"
                  type={typePass ? 'text' : 'password'}
                  className="input"
                  name="password"
                  onChange={handleChangeInput}
                  value={password}
                  style={{ background: `${alert.password ? '#fd2d6a14' : ''}` }}
                />
                <small className="icon-eyes" onClick={() => setTypePass(!typePass)}>
                  {typePass ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </small>
              </div>
            </div>
            <small className="form-text text-danger">{alert.password ? alert.password : ''}</small>

            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <input
                  placeholder="Confirm password"
                  type={typeCfPass ? 'text' : 'password'}
                  className="input"
                  name="cf_password"
                  onChange={handleChangeInput}
                  value={cf_password}
                  style={{ background: `${alert.cf_password ? '#fd2d6a14' : ''}` }}
                />
                <small className="icon-eyes" onClick={() => setTypeCfPass(!typeCfPass)}>
                  {typeCfPass ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </small>
              </div>
            </div>
            <small className="form-text text-danger">
              {alert.cf_password ? alert.cf_password : ''}
            </small>

            <div className="gender-details">
              <input
                type="radio"
                name="gender"
                id="male"
                value="male"
                defaultChecked
                onChange={handleChangeInput}
              />
              <input
                type="radio"
                name="gender"
                id="female"
                value="female"
                onChange={handleChangeInput}
              />
              <input
                type="radio"
                name="gender"
                id="other"
                value="other"
                onChange={handleChangeInput}
              />
              <div className="category">
                <label htmlFor="male">
                  <span className="dot one"></span>
                  <span className="gender">Male</span>
                </label>
                <label htmlFor="female">
                  <span className="dot two"></span>
                  <span className="gender">Female</span>
                </label>
                <label htmlFor="other">
                  <span className="dot three"></span>
                  <span className="gender">Other</span>
                </label>
              </div>
            </div>
            {/* <a href="#">Forgot Password?</a> */}
            <button className="btn-login" type="submit">
              Register
            </button>

            <p>
              Already have an account?
              <Link className="link-register" to="/">
                Login Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
