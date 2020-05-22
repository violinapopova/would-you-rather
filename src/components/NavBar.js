import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Image } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

class NavBar extends Component {
  render() {
    const { authedUser, users } = this.props;
    const { avatarURL, name } = users[authedUser];

    return (
      <div className="ui purple fixed menu">
        <div className="ui container">
          <div className="item" />
          <NavLink
            to="/"
            exact
            className="header item"
            activeClassName="active"
          >
            <Image
              src="icons8-ask-question-64.png"
              style={{ width: "55px", marginRight: "5px" }}
            />
            Home
          </NavLink>
          <NavLink to="/add" exact className="item" activeClassName="active">
            Add a Question
          </NavLink>
          <NavLink
            to="/leaderboard"
            exact
            className="item"
            activeClassName="active"
          >
            Leader Board
          </NavLink>
          <div className="ui right floated item">
            <span style={{ marginRight: "15px" }}>Hi, {name}!</span>
            <img className="ui avatar image" src={avatarURL} alt="" />
          </div>
          <NavLink to="/logoutpage" exact className="item" activeClassName="active">
            Exit
          </NavLink>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { authedUser: state.authedUser, users: state.users };
};

export default connect(mapStateToProps)(NavBar);
