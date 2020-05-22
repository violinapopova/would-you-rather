import { GET_USERS, GET_ANSWERED_QUESTIONS, GET_ADDED_QUESTIONS } from "../actions/users";
  
  export default function users(state = {}, action) {
    switch (action.type) {
      case GET_USERS:
        return { ...state, ...action.users };
      case GET_ADDED_QUESTIONS:
        return {
          ...state,
          [action.authedUser]: {
            ...state[action.authedUser],
            questions: [...state[action.authedUser].questions, action.qid]
          }
        };
      case GET_ANSWERED_QUESTIONS:
        return {
          ...state,
          [action.authedUser]: {
            ...state[action.authedUser],
            answers: {
              ...state[action.authedUser].answers,
              [action.qid]: action.answer
            }
          }
        };
      default:
        return state;
    }
  }
  