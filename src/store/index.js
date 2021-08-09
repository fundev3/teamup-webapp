import { createStore } from "redux";
import reducer from "./reducer";

const initialState = {
  alert: {
    message: "",
    showAlert: false,
    type: "success",
  },
};

const store = createStore(reducer, initialState);

export default store;
