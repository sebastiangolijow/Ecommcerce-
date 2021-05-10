import * as actionType from "../action_types/actionTypes";

export const setDarkMode = (dark) => {
  return function(dispatch) {
    dispatch({
      type: actionType.DARK,
      payload: dark,
    });
  };
};
