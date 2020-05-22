import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css';

class AppFooter extends Component {
  render() {
    return (
      <div
        className="ui purple vertical footer segment"
        style={{ marginTop: "2em", padding: "2em 0" }}
      >
        <div className="ui container smaller" style={{ fontSize: "0.9em" }}>
          {new Date().getFullYear()}, This app is powered by Udacity
        </div>
      </div>
    );
  }
}

export default AppFooter;
