import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown, Image, Message } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import { getActiveUser } from "../actions/authedUser";

class LoginPage extends Component {
  state = {
    activeUser: null,
    message: { hidden: true, content: "" }
  };
  referrer = null;

  componentDidMount() {
    const {
      history,
      location: { pathname }
    } = this.props;
    this.referrer = pathname;
    history.push("/loginpage");
  }

  handleSelectedUser = (event, data) => {
    this.setState({ activeUser: data.value });
  };

  handleAuthenticatedUser = () => {
    const { history } = this.props;
    if (!this.state.activeUser) {
      this.setState({
        message: {
          hidden: false,
          content: "Please select a user to login"
        }
      });
      return;
    } else {
      this.setState({
        message: {
          hidden: true,
          content: ""
        }
      });
    }

    this.props.getActiveUser(this.state.activeUser);
    if (this.referrer === "/logoutpage" || this.referrer === "/loginpage") {
      history.push("/");
    } else {
      history.push(this.referrer);
    }
  };

  render() {
    const { users } = this.props;
    if (!users) {
      return;
    }

    const userDropdownOptions = Object.keys(users).map(userId => ({
      key: userId,
      value: userId,
      text: users[userId].name,
      image: { avatar: true, src: users[userId].avatarURL }
    }));

    const { message } = this.state;

    return (
      <div className="ui container">
        <div className="ui middle aligned center aligned grid">
          <div className="column" style={{ width: "460px", marginTop: "10em" }}>
            <Image
              src="/icons8-ask-question-64.png"
              style={{
                position: "absolute",
                zIndex: "100",
                top: "3px",
                left: "40px",
                width: "95px"
              }}
            />
            <h2
              className="ui purple image header"
              style={{ marginLeft: "65px", marginBottom: "35px" }}
            >
              <div className="content">Would you rather?</div>
            </h2>
            <form className="ui large form">
              <div className="ui raised segment">
                <div className="field">
                  <Dropdown
                    placeholder="Please select a user..."
                    fluid
                    selection
                    options={userDropdownOptions}
                    onChange={this.handleSelectedUser}
                  />
                </div>
                <Message hidden={message.hidden} negative>
                  {message.content}
                </Message>
                <div className="field">
                  This demo app and does not require log-in with a password.
                </div>
                <div
                  className="ui fluid purple submit button"
                  onClick={this.handleAuthenticatedUser}
                >
                  Log-in
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return { users };
};

export default connect(
  mapStateToProps,
  { getActiveUser }
)(LoginPage);
