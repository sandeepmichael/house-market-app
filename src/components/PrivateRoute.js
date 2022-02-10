import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {useAuthStatus} from '../hooks/useAuthStatus'
import Loader from 'react-spinners/BeatLoader';


const PrivateRoute = () => {
    const {loggedin ,checkingstatus} = useAuthStatus()
    if(checkingstatus){
     return  <Loader />
    }
  return <div>
       {loggedin ? <Outlet /> : <Navigate to='/sign-in' />}
  </div>;
};

export default PrivateRoute;
