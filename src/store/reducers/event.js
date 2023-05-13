import { GET_EVENTS } from "../actionTypes/event";

const initialState = {
  events: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        events: action.events,
      };

    default:
      return state;
  }
};

export default reducer;
