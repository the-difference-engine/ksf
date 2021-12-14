import React, { useState, useContext, useEffect } from "react";

import { Redirect } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import Cookies from 'universal-cookie';
// import {GoogleAccessTokenContext} from '../../../../utils/context/GoogleBtnContext'
import style from '../style.css'

const GoogleBtn = () => {
  // const [googleAccessToken, setGoogleAccessToken] = useContext(GoogleAccessTokenContext);
  const [isLogined, setIsLogined] = useState(false);
  const [accessToken, setAccessToken] = useState("");



  const login = (response) => {
    if (response) {
      console.log("tokenId:", response.tokenId, 'response:', response)
      setIsLogined(true)
      setAccessToken(response.accessToken)
      const cookies = new Cookies();
      cookies.set('gAuth', response.tokenId, { path: '/' });
    }
  };

  const logout = (response) => {
    setIsLogined(true)
    setAccessToken("")
    // setGoogleAccessToken("")
  };
  

  const handleLoginFailure = (response) => {
    alert("Failed to log in");
  };

  const handleLogoutFailure = (response) => {
    alert("Failed to log out");
  };

  return (
    <div>
      {isLogined ? (
        <GoogleLogout
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Logout"
          className="google-logout"
          onLogoutSuccess={logout}
          onFailure={handleLogoutFailure}
        ></GoogleLogout>
      ) : (
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          className="google-login"
          buttonText="Sign in with Google"
          onSuccess={login}
          onFailure={handleLoginFailure}
          cookiePolicy={"single_host_origin"}
          responseType="code,token"
        />
      )}
      {accessToken
        ? <Redirect to='/' /> : null}
    </div>
  );
}

export default GoogleBtn;
