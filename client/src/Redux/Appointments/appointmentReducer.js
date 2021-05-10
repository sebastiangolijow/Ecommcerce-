import * as actionType from "../action_types/actionTypes";

const InitialState = {
  hours: [],
  order: "",
  date: "",
};

function appointmentReducer(state = InitialState, action) {
  switch (action.type) {
    case actionType.APPOINTMENTS:
      return {
        ...state,
        hours: action.payload.hours,
        order: action.payload.order,
        date: action.payload.date,
      };
    default:
      return state;
  }
}

export default appointmentReducer;
