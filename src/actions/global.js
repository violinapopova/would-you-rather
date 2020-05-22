import { getUsers } from "./users";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { getFirstLoadedData } from "../utils/api";
import { getExistingQuestions } from "./questions";

export const handleFirstLoadedData = () => dispatch => {
  dispatch(showLoading());

  return getFirstLoadedData().then(({ questions, users }) => {
    dispatch(getUsers(users));
    dispatch(getExistingQuestions(questions));
    dispatch(hideLoading());
  });
};
