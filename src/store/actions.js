import { ALERT_SUCCESS } from "./types";

export function alertSuccess(message) {
  return { payload: message, showAlert: true, type: ALERT_SUCCESS };
}
