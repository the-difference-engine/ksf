import React from 'react';
import GoogleBtn from './GoogleBtn/GoogleBtn';
import './style.css';

const Login = () => {
  return (
    <div>
      <div className="login-logo">
        <img src="ksflogo.png" alt="login-logo" />
      </div>

      <div className="google-button">
        <GoogleBtn />
      </div>
    </div>
  );
};

export default Login;
