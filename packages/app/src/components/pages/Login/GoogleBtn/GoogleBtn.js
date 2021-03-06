import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import style from '../style.css'

class GoogleBtn extends Component {
  state = {
    isLogined: false,
    accessToken: ""
  };

  login = (response) => {
    if (response.accessToken) {
      this.setState((state) => ({
        isLogined: true,
        accessToken: response.accessToken
      }));
    }
  };

  logout = (response) => {
    this.setState((state) => ({
      isLogined: false,
      accessToken: ""
    }));
  };
  

  handleLoginFailure = (response) => {
    alert("Failed to log in");
  };

  handleLogoutFailure = (response) => {
    alert("Failed to log out");
  };

  render() {
    return (
      <div>
        {this.state.isLogined ? (
          <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Logout"
            className="google-logout"
            onLogoutSuccess={this.logout}
            onFailure={this.handleLogoutFailure}
          ></GoogleLogout>
        ) : (
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            className="google-login"
            buttonText="Sign in with Google"
            onSuccess={this.login}
            onFailure={this.handleLoginFailure}
            cookiePolicy={"single_host_origin"}
            responseType="code,token"
          />
        )}
        {this.state.accessToken
          ? <Redirect to='/' /> : null}
      </div>
    );
  }
}

export default GoogleBtn;
