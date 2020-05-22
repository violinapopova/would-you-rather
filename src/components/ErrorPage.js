import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css';

class ErrorPage extends Component {
  render() {
    return (
      <div>
        <h1>Error!</h1>
        <p>The page you are requesting could not be found.</p>
      </div>
    );
  }
}

export default ErrorPage;
