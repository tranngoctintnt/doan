import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
// import '../styles/login.css';
import wave from '../images/wave.png';
import bg from '../images/bg.svg';
import avatar from '../images/avatar.svg';

const Login = () => {
  const initialState = { email: '', password: '' };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const [typePass, setTypePass] = useState(false);

  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.token) navigate('/');
  }, [auth.token, navigate]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
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
            <img src={avatar} alt="avatar" />
            <h2 className="title">Welcome</h2>
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
                />
              </div>
            </div>
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
            {/* <a href="#">Forgot Password?</a> */}
            <button className="btn-login" type="submit" disabled={email && password ? false : true}>
              Login
            </button>

            <p>
              You don't have an account?{' '}
              <Link className="link-register" to="/register">
                {' '}
                Register Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
