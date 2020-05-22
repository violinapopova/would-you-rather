import { GET_ACTIVE_USER } from "../actions/authedUser";

export default function authedUser(state = null, action) {
  switch (action.type) {
    case GET_ACTIVE_USER:
      return action.id;
    default:
      return state;
  }
}
