import { GET_QUESTIONS, USER_VOTE, ADD_NEW_QUESTION } from "../actions/questions";
  
  export default function questions(state = {}, action) {
    switch (action.type) {
      case GET_QUESTIONS:
        return { ...state, ...action.questions };
      case USER_VOTE:
        const { authedUser, qid, answer } = action;
        return {
          ...state,
          [qid]: {
            ...state[qid],
            [answer]: {
              ...state[qid][answer],
              votes: [...state[qid][answer].votes, authedUser]
            }
          }
        };
      case ADD_NEW_QUESTION:
        const { question } = action;
        return { ...state, [question.id]: question };
      default:
        return state;
    }
  }
  