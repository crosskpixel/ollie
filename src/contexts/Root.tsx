import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthAPI } from '../api/login';

export const RootContext = () => {
  const navigate = useNavigate();

  useEffect(() => {
      const accessToken = localStorage.getItem("access_token");
      if(accessToken && AuthAPI.checkDateOfTokenToBeValid(accessToken)){
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
  }, [])

  return <div id="div-root" >
      <Outlet></Outlet>
  </div>
  
}