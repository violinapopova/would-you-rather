import React, { Component, Fragment } from 'react';
import LoadingBar from 'react-redux-loading-bar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleFirstLoadedData } from '../actions/global';
import NavBar from './NavBar';
import AppFooter from './AppFooter';
import LoginPage from './LoginPage';
import LogoutPage from './LogoutPage';
import ErrorPage from './ErrorPage';
import NewQuestion from './NewQuestion';
import ViewQuestion from './ViewQuestion';
import ExistingQuestions from './ExistingQuestions';
import LeaderBoard from './LeaderBoard';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  // shows the current tab: answered or unanswered questions
  state = { index: 0 };

  handleTabSelection = (e, { index }) => {
    this.setState({ index });
  };

  resetIndexToZero = () => {
    // after creating a new question resets active tab index to zero (unanswered question)
    this.setState({ index: 0 });
  };

  componentDidMount() {
    const { handleFirstLoadedData } = this.props;
    handleFirstLoadedData();
  }

  render() {
    const { authedUser } = this.props;

    if (!authedUser) {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/" component={LoginPage} />
          </Switch>
        </BrowserRouter>
      );
    }

    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar style={{ zIndex: 1000 }} />
          <NavBar />
          <div className="ui main text container" style={{ marginTop: "10em" }}>
            <Switch>
              <Route
                path="/"
                exact
                render={() => {
                  return (
                    <ExistingQuestions
                      handleTabSelection={this.handleTabSelection}
                      index={this.state.index}
                    />
                  );
                }}
              />
              <Route
                path="/add"
                render={history => {
                  return (
                    <NewQuestion
                      resetIndexToZero={this.resetIndexToZero}
                      history={history.history}
                    />
                  );
                }}
              />
              <Route path="/questions/:question_id" component={ViewQuestion} />
              <Route path="/leaderboard" component={LeaderBoard} />
              <Route path="/logoutpage" component={LogoutPage} />
              <Route path="/404" component={ErrorPage} />
              <Route path="/" component={ErrorPage} />
            </Switch>
          </div>
          <AppFooter />
        </Fragment>
      </BrowserRouter>
    );
  }

}

const mapStateToProps = state => {
  const { authedUser } = state;
  return { authedUser };
};

export default connect(mapStateToProps, { handleFirstLoadedData })(App);
