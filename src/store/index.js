import alertReducer from "./reducers/alertReducer";
import { combineReducers, createStore } from "redux";

const allReducers = combineReducers({ alert: alertReducer });

const store = createStore(allReducers);

export default store;
