import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css';
import { connect } from "react-redux";
import { getActiveUser } from "../actions/authedUser";

class LogoutPage extends Component {
  componentDidMount() {
    this.props.getActiveUser(null);
  }

  render() {
    return <div>Logging out from the app...</div>;
  }
}

export default connect(
  null,
  { getActiveUser }
)(LogoutPage);
