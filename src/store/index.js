import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import user from "./reducers";
import events from "./reducers/event";

const reducers = combineReducers({
  user,
  events,
});

const store = configureStore({
  reducer: reducers,
});
export default store;
