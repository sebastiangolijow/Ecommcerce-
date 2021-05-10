import * as actionType from "../action_types/actionTypes";

export const restoredRedux = (user) => {
  return function(dispatch) {
    dispatch({ type: actionType.RESTORE_REDUX, payload: user });
  };
};
