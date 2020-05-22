import React, { Component } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Card, Grid, Image, Label } from "semantic-ui-react";
import { connect } from "react-redux";

class Leaderboard extends Component {
  numberOfCardsPerRow = 3;

  render() {
    const { users } = this.props;

    const trophyColors = ["green", "yellow", "red"];
    let place = 0;
    let placeSuffix = ["st", "nd", "rd"];

    const usersWithResult = {};
    Object.keys(users).forEach(uid => {
      const user = users[uid];
      const numberAnsweredQuestions = Object.keys(user.answers).length;
      const numberCreatedQuestions = user.questions.length;
      user.result = numberAnsweredQuestions + numberCreatedQuestions;
      usersWithResult[uid] = user;
    });

    const usersWithResultGrouped = {};
    Object.keys(users)
      .map(uid => users[uid])
      .sort((a, b) => b.result - a.result)
      .forEach(user => {
        usersWithResultGrouped[user.id] = user;
      });

    const userBoard = Object.keys(usersWithResultGrouped).map(uid => {
      const user = usersWithResultGrouped[uid];
      let label = null;
      let trophyColor = trophyColors[place++];
      if (trophyColor) {
        label = {
          as: "div",
          corner: "right",
          icon: "trophy",
          color: trophyColor
        };
      }
      const numberAnsweredQuestions = Object.keys(user.answers).length;
      const numberCreatedQuestions = user.questions.length;
      const result = numberAnsweredQuestions + numberCreatedQuestions;

      return (
        <Card key={uid}>

          <Image src={user.avatarURL} label={label} />

          <Card.Content>

            <Card.Header>{user.name}</Card.Header>

            <Card.Meta>
              Place &nbsp;
              <Label size="tiny">
                {place}
                {placeSuffix.shift() || "th"}
              </Label>
            </Card.Meta>

            <Card.Description>
              <Grid columns={2} divided style={{ fontSize: "1rem" }}>
                <Grid.Row>
                  <Grid.Column floated="left" width={10}>
                    Created: {numberCreatedQuestions}
                    <br />
                    Answered: {numberAnsweredQuestions}
                  </Grid.Column>

                  <Grid.Column floated="right" width={5}>
                    <div>
                      <strong>Result</strong>
                    </div>
                    <Label circular color={trophyColor} size="large">
                      {result}
                    </Label>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

            </Card.Description>

          </Card.Content>

        </Card>
      );
    });
    return (
      <Card.Group itemsPerRow={this.numberOfCardsPerRow}>{userBoard}</Card.Group>
    );
  }
}

const mapStateToProps = state => {
  return { users: state.users };
};

export default connect(mapStateToProps)(Leaderboard);
