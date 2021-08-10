import * as actionTypes from "../types";
import { alert } from "../stores/alert";

export default function alertReducer(state = alert, action) {
  if (action.type === actionTypes.ALERT) {
    return {
      ...state,
      message: action.payload.message,
      showAlert: action.payload.showAlert,
      type: action.payload.typeAlert,
    };
  }
  return state;
}
