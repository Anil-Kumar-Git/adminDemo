import { act } from "react-dom/test-utils"
import {
  LOGIN_USER,
  LOGOUT_USER,
  API_ERROR,
} from "./actionTypes"

const initialState = {
  error: "",
  loading: false,
  loginUserData:""
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: false,
        loginUserData: action.payload
      }
      break
    case LOGOUT_USER:
      state = { ...state }
      break
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default loginReducer
