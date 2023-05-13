import {
  CREATE_USER_PENDING,
  DELETE_USER_PENDING,
  GET_ALL_USERS,
  GET_USER,
  GET_USER_DATA,
  GET_USER_TOKEN,
  LOG_OUT,
  PENDING,
  REJECTED,
  UPDATE_USER_PENDING,
} from "../actionTypes";

const initialState = {
  user: null,
  token: "",
  loading: false,
  role: "",
  errorMsg: "",
  allUsers: [],
  registePending: "",
  deletePending: "",
  updatePending: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_TOKEN:
      localStorage.setItem("user-token", JSON.stringify(action.token));
      return {
        ...state,
        token: action.token,
        loading: false,
        errorMsg: "",
      };
    case PENDING:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_DATA:
      return {
        ...state,
        user: action.user,
        loading: false,
        role: action.user.role,
      };
    case CREATE_USER_PENDING: {
      return {
        ...state,
        registePending: true,
      };
    }
    case DELETE_USER_PENDING: {
      return {
        ...state,
        deletePending: true,
      };
    }
    case UPDATE_USER_PENDING: {
      return {
        ...state,
        updatePending: true,
      };
    }
    case GET_ALL_USERS:
      return {
        ...state,
        loading: false,
        allUsers: action.allUsers,
        registePending: false,
        updatePending: false,
        deletePending: false,
      };
    case REJECTED:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
      };
      case LOG_OUT:{
        localStorage.removeItem('user-token')
        return{
          user: null,
          token: "",
          loading: false,
          role: "",
          errorMsg: "",
          allUsers: [],
          registePending: "",
          deletePending: "",
          updatePending: "",
        }
      }
    default:
      return state;
  }
};

export default reducer;
