import { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import PageRender from './customRouter/PageRender';
import PrivateRouter from './customRouter/PrivateRouter';

import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';

import Alert from './components/alert/Alert';
import Header from './components/Header/Header';
import StatusModal from './components/StatusModal';

import { refreshToken } from './redux/actions/authAction';
import { getPosts } from './redux/actions/postAction';
import { getSuggestions } from './redux/actions/suggestionsAction';

import io from 'socket.io-client';
import { GLOBALTYPES } from './redux/actions/globalTypes';
import SocketClient from './SocketClient';

import { getNotifies } from './redux/actions/notifyAction';
import CallModal from './components/message/CallModal';
import Peer from 'peerjs';

function App() {
  const { auth, status, modal, call } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());

    const socket = io();
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getSuggestions(auth.token));
      dispatch(getNotifies(auth.token));
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    } else if (Notification.permission === 'granted') {
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
        }
      });
    }
  }, []);

  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: '/',
      secure: true,
    });

    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer });
  }, [dispatch]);


  return (
    <Router>
      <Fragment>
        <Alert />
        {/* <input type="checkbox" id="theme" /> */}
        <div className="App">
          <div className="main">
            {/*  */}
            {auth.token && <Header />}
            {/* {auth.token && <Home />} */}
            {status && <StatusModal />}
            {auth.token && <SocketClient />}
            {call && <CallModal />}
            <Routes>
              <Route exact path="/" element={auth.token ? <Home /> : <Login />} />

              <Route exact path="/register" element={<Register />} />

              <Route exact path="/:page" element={<PrivateRouter />}>
                <Route exact path="/:page" element={<PageRender />} />
              </Route>

              <Route exact path="/:page/:id" element={<PrivateRouter />}>
                <Route exact path="/:page/:id" element={<PageRender />} />
              </Route>
            </Routes>
          </div>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
