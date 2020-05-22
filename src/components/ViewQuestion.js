import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css';
import { connect } from "react-redux";
import { handleQuestionAnswer } from "../actions/questions";
import {
  Card,
  Image,
  Segment,
  Label,
  Progress,
  Button,
  Form,
  Radio,
  Message
} from "semantic-ui-react";

class ViewQuestion extends Component {
  state = { userVote: null, message: { hidden: true, content: "" } };

  handleUserVote = (e, data) => {
    this.setState({ userVote: data.value });
  };

  handleUserSubmit = () => {
    if (!this.state.userVote) {
      this.setState({
        message: {
          hidden: false,
          content: "Please select your option"
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
    // action
    const qid = this.props.match.params.question_id;
    const answer = this.state.userVote;
    const { authedUser, handleQuestionAnswer } = this.props;
    handleQuestionAnswer({ authedUser, qid, answer });
  };

  qustionStatistic = () => {
    const qid = this.props.match.params.question_id;
    const { users, authedUser, questions } = this.props;

    const question = questions[qid];
    if (!question) {
      return;
    }

    const user = users[question.author];

    const userVoteForFirstOption = question.optionOne.votes.includes(authedUser);
    const userVoteForSecondOption = question.optionTwo.votes.includes(authedUser);
    const totalVotesForFirstOption = question.optionOne.votes.length;
    const totalVotesForSecondOption = question.optionTwo.votes.length;
    const allVotes = totalVotesForFirstOption + totalVotesForSecondOption;
    const percentageForFirstOption =
      Math.round((totalVotesForFirstOption / allVotes) * 10000) / 100;
    const votePercentOptionTwo =
      Math.round((totalVotesForSecondOption / allVotes) * 10000) / 100;

    return (
      <Card key={qid} style={{ width: "420px" }}>
        <Card.Content>
          <Image floated="right" size="tiny" src={user.avatarURL} />
          <Card.Header>{user.name} asks</Card.Header>
          <div>Would you rather</div>
          <Card.Description>
            <Segment>
              {userVoteForFirstOption && (
                <Label as="a" color="green" ribbon="right">
                  Your Answer
                </Label>
              )}
              <p>{question.optionOne.text}</p>
              <Progress percent={percentageForFirstOption} progress>
                {totalVotesForFirstOption} out of {allVotes} answers
              </Progress>
            </Segment>
            <Segment>
              {userVoteForSecondOption && (
                <Label color="green" ribbon="right">
                  Your Answer
                </Label>
              )}
              <p>{question.optionTwo.text}</p>
              <Progress percent={votePercentOptionTwo} progress>
                {totalVotesForSecondOption} out of {allVotes} answers
              </Progress>
            </Segment>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  };

  answersPerQuestion = () => {
    const qid = this.props.match.params.question_id;
    const { questions, users } = this.props;

    const question = questions[qid];
    if (!question) {
      return;
    }

    const user = users[question.author];
    const { message } = this.state;

    return (
      <Card key={qid} style={{ width: "420px" }}>
        <Card.Content>
          <Image floated="right" size="tiny" src={user.avatarURL} />
          <Card.Header>{user.name} asks</Card.Header>
          <div>Would you rather</div>
          <Card.Description>
            <Form>
              <Form.Field>
                <Radio
                  label={question.optionOne.text}
                  name="radioGroupVote"
                  value="optionOne"
                  checked={this.state.userVote === "optionOne"}
                  onChange={this.handleUserVote}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label={question.optionTwo.text}
                  name="radioGroupVote"
                  value="optionTwo"
                  checked={this.state.userVote === "optionTwo"}
                  onChange={this.handleUserVote}
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
    );
  };

  onQuestionAnswer() {
    const { questions, authedUser } = this.props;
    const qid = this.props.match.params.question_id;

    const question = questions[qid];
    if (!question) {
      return null;
    }

    return (
      question.optionOne.votes.includes(authedUser) ||
      question.optionTwo.votes.includes(authedUser)
    );
  }

  componentDidMount() {
    const { questions } = this.props;
    const qid = this.props.match.params.question_id;

    const question = questions[qid];
    if (!question) {
      const { history } = this.props;
      history.push("/404");
    }
  }

  render() {
    let result;
    if (this.onQuestionAnswer() === true) {
      result = this.qustionStatistic();
    } else {
      result = this.answersPerQuestion();
    }
    return <Card.Group centered>{result}</Card.Group>;
  }
}

const mapStateToProps = state => {
  return {
    authedUser: state.authedUser,
    questions: state.questions,
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  { handleQuestionAnswer }
)(ViewQuestion);
