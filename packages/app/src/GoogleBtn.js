import React, { Component } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

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
    console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
    return (
      <div>
        {this.state.isLogined ? (
          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.logout}
            onFailure={this.handleLogoutFailure}
          ></GoogleLogout>
        ) : (
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Login"
            onSuccess={this.login}
            onFailure={this.handleLoginFailure}
            cookiePolicy={"single_host_origin"}
            responseType="code,token"
          />
        )}
        {this.state.accessToken ? <h5>You have successfully logged in!</h5> : null}
      </div>
    );
  }
}

export default GoogleBtn;
