import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Button, Card, Image, Label, Menu, Tab } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ExistingQuestions extends Component {
  numberOfCardsPerRow = 2;

  generateCards = filterBy => {
    const { users, questions } = this.props;
    const cardPerQuestion = Object.keys(questions)
      .filter(filterBy)
      .map(qid => {
        const question = questions[qid];
        const user = users[question.author];
        return (
          <Card key={qid}>

            <Card.Content>
              <Image floated="right" size="tiny" src={user.avatarURL} />
              <Card.Header>{user.name} asks</Card.Header>
              <div>
                Would you rather {question.optionOne.text} or{" "}
                {question.optionTwo.text}?
              </div>
            </Card.Content>

            <Card.Content extra>
              <div className="ui two buttons">
                <Link to={`/questions/${qid}`} style={{ width: "100%" }}>
                  <Button fluid basic color="purple">
                    View Question
                  </Button>
                </Link>
              </div>
            </Card.Content>

          </Card>
        );
      });

    return cardPerQuestion.length
      ? [
        cardPerQuestion.length,
          <Card.Group itemsPerRow={this.numberOfCardsPerRow}>{cardPerQuestion}</Card.Group>
        ]
      : [cardPerQuestion.length];
  };

  render() {
    const { authedUser, index, questions, handleTabSelection } = this.props;

    const [
      numberUnansweredQuestions,
      unansweredQuestionsMessage = "There are no unanswered questions."
    ] = this.generateCards(
      id =>
        !questions[id].optionOne.votes.includes(authedUser) &&
        !questions[id].optionTwo.votes.includes(authedUser)
    );

    const [
      numberAnsweredQuestions,
      answeredQuestionsMessage = "No one have answered questions yet."
    ] = this.generateCards(
      qid =>
        questions[qid].optionOne.votes.includes(authedUser) ||
        questions[qid].optionTwo.votes.includes(authedUser)
    );

    const panes = [
      {
        menuItem: (
          <Menu.Item key="unanswered-questions">
            Unanswered Questions<Label>{numberUnansweredQuestions}</Label>
          </Menu.Item>
        ),
        render: () => <Tab.Pane>{unansweredQuestionsMessage}</Tab.Pane>
      },
      {
        menuItem: (
          <Menu.Item key="answered-questions">
            Answered Questions<Label>{numberAnsweredQuestions}</Label>
          </Menu.Item>
        ),
        render: () => <Tab.Pane>{answeredQuestionsMessage}</Tab.Pane>
      }
    ];

    return (
      <div>
        <div>
          <Tab
            panes={panes}
            index={index}
            onTabSelection={(e, data) => handleTabSelection(e, data)}
          />
        </div>
      </div>
    );
  }
}

const groupQuestionsByTimeStamp = questions => {
  const groupQuestions = {};
  Object.keys(questions)
    .map(key => questions[key])
    .sort((a, b) => b.timestamp - a.timestamp)
    .forEach(question => {
      groupQuestions[question.id] = question;
    });
  return groupQuestions;
};

const mapStateToProps = state => {
  // todo state.questions transform to array, order by timestamp
  return {
    questions: groupQuestionsByTimeStamp(state.questions),
    users: state.users,
    authedUser: state.authedUser
  };
};

export default connect(mapStateToProps)(ExistingQuestions);
