import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css';
import { onAddedNewQuestion } from "../actions/questions";
import { connect } from "react-redux";
import { Card, Button, Form, Image, Input, Message } from "semantic-ui-react";

class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    message: { hidden: true, content: "" }
  };

  handleChangeOption = (e, data) => {
    this.setState({ [data.id]: data.value });
  };

  handleUserSubmit = async () => {
    const { optionOne: optionOneText, optionTwo: optionTwoText } = this.state;
    const { authedUser: author, history, resetIndexToZero } = this.props;

    if (!optionOneText || !optionTwoText) {
      this.setState({
        message: {
          hidden: false,
          content: "Please enter the text for first and second option!"
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
    await this.props.onAddedNewQuestion({
      optionOneText,
      optionTwoText,
      author
    });
    resetIndexToZero();
    history.push("/");
  };

  render() {
    const { authedUser, users } = this.props;
    const user = users[authedUser];
    const { message } = this.state;

    return (
      <div>
        <Card.Group centered>
          <Card style={{ width: "400px" }}>
            <Card.Content>
              <Image floated="right" size="tiny" src={user.avatarURL} />
              <Card.Header>{user.name} asks</Card.Header>
              <div>Would you rather</div>
              <Card.Description>
                <Form>
                  <Form.Field>
                    <Input
                      id="optionOne"
                      placeholder="Enter First Option Here"
                      value={this.state.optionOne}
                      onChange={this.handleChangeOption}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Input
                      id="optionTwo"
                      placeholder="Enter Second Option Here"
                      value={this.state.optionTwo}
                      onChange={this.handleChangeOption}
                    />
                  </Form.Field>
                  <Message hidden={message.hidden} negative>
                    {message.content}
                  </Message>
                </Form>
              </Card.Description>
            </Card.Content>

            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="purple" onClick={this.handleUserSubmit}>
                  Submit
                </Button>
              </div>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { users: state.users, authedUser: state.authedUser };
};

export default connect(
  mapStateToProps,
  { onAddedNewQuestion }
)(NewQuestion);
