import * as actionTypes from "../types";

export function alertSuccess(message) {
  return {
    payload: {
      message,
      showAlert: true,
      typeAlert: "success",
    },
    type: actionTypes.ALERT,
  };
}

export function alertError(message) {
  return {
    payload: {
      message,
      showAlert: true,
      typeAlert: "error",
    },
    type: actionTypes.ALERT,
  };
}
