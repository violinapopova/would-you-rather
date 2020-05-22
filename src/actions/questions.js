import { showLoading, hideLoading } from "react-redux-loading-bar";
import { saveQuestionAnswer, saveQuestion } from "../utils/api";
import { getAnsweredQuestions, getAddedQuestions } from "./users";

export const GET_QUESTIONS = "GET_QUESTIONS";
export const USER_VOTE = "USER_VOTE";
export const ADD_NEW_QUESTION = "ADD_NEW_QUESTION";

export function getExistingQuestions(questions) {
  return { type: GET_QUESTIONS, questions };
}

// user have answered question
function votedQuestion({ authedUser, qid, answer }) {
  return {
    type: USER_VOTE,
    authedUser,
    qid,
    answer
  };
}

export function handleQuestionAnswer({ authedUser, qid, answer }) {
  return dispatch => {
    dispatch(showLoading());

    return saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
      dispatch(votedQuestion({ authedUser, qid, answer }));
      dispatch(getAnsweredQuestions({ authedUser, qid, answer }));
      dispatch(hideLoading());
    });
  };
}

// add new question
function addNewQuestion({ question }) {
  return {
    type: ADD_NEW_QUESTION,
    question
  };
}

export function onAddedNewQuestion({ author, optionOneText, optionTwoText }) {
  return dispatch => {
    dispatch(showLoading());

    return saveQuestion({ author, optionOneText, optionTwoText }).then(
      question => {
        dispatch(getAddedQuestions({ authedUser: author, qid: question.id }));
        dispatch(addNewQuestion({ question }));
        dispatch(hideLoading());
      }
    );
  };
}
