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


function App() {
  const { auth, status } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    if(auth.token) 
    dispatch(getPosts(auth.token));
  }, [dispatch, auth.token]);

  return (
    <Router>
      <Fragment>
        <Alert />
        {/* <input type="checkbox" id="theme" /> */}
        <div className="App">
          <div className="main">
            {auth.token && <Header />}
            {status && <StatusModal/>}
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
