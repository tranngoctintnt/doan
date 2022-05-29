import { Outlet, Navigate, Redirect } from 'react-router-dom';

const PrivateRouter = (props) => {
  const firstLogin = sessionStorage.getItem('firstLogin');
  return firstLogin ? <Outlet {...props} /> : <Navigate to="/" />;
};

export default PrivateRouter;
