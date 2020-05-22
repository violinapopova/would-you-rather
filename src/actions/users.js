export const GET_USERS = "GET_USERS";
export const GET_ADDED_QUESTIONS = "GET_ADDED_QUESTIONS";
export const GET_ANSWERED_QUESTIONS = "GET_ANSWERED_QUESTIONS";

export function getUsers(users) {
  return { type: GET_USERS, users };
}

export function getAddedQuestions({ authedUser, qid }) {
  return { type: GET_ADDED_QUESTIONS, authedUser, qid };
}

export function getAnsweredQuestions({ answer, authedUser, qid }) {
  return { type: GET_ANSWERED_QUESTIONS, answer, authedUser, qid };
}


