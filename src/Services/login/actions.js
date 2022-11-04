import {
  LOGIN_USER,
  LOGOUT_USER,
  API_ERROR,
  API_MESSAGE,
} from "./actionTypes"

export const loginUser = (user) => {
  return {
    type: LOGIN_USER,
    payload: user ,
  }
}

export const logoutUser = (history) => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  }
}

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  }
}

export const apiMessage = (message) => {
  return {
    type: API_MESSAGE,
    payload: message,
  }
}

