import React from "react";

export default () => {
  return (
    <div className="container center-align">
      <h1>Welcome!</h1>
      <p>Login with your favorite service</p>
      <a href="/auth/google" className="waves-effect waves-light btn">
        Google
      </a>
      <a href="/auth/facebook" className="waves-effect waves-light btn">
        Facebook
      </a>
    </div>
  );
};
