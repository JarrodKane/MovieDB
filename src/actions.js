import {
  CHANGE_SEARCH_FIELD,
  CHANGE_USERNAME_FIELD,
  CHANGE_PASSWORD_FIELD
} from "./constants";

export const setUserNameField = text => ({
  type: CHANGE_USERNAME_FIELD,
  payload: text
});

export const setPasswordField = text => ({
  type: CHANGE_PASSWORD_FIELD,
  payload: text
});

export const setSearchField = text => ({
  type: CHANGE_SEARCH_FIELD,
  payload: text
});
