import * as actionType from "../action_types/actionTypes";

const InitialState = {
  dark: false,
};

function Reducer(state = InitialState, action) {
  switch (action.type) {
    case actionType.DARK:
      return {
        ...state,
        dark: action.payload,
      };

    default:
      return state;
  }
}
export default Reducer;
