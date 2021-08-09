import { ALERT_SUCCESS } from "./types";

export default function reducer(state, action) {
  switch (action.type) {
    case ALERT_SUCCESS: {
      const alert = {
        ...state.alert,
        message: action.payload,
        showAlert: action.showAlert,
        type: "success",
      };
      return {
        ...state,
        alert,
      };
    }

    default:
      return state;
  }
}
