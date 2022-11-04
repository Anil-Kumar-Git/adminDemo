import { configureStore } from "@reduxjs/toolkit";
import Slice from "./Reducers/Slice";
import Users from "./Reducers/Users";
import loginReducer from "./login/reducer";

const store =configureStore({
    reducer:{
       admin:Slice,
       usersData:Users,
       loginData:loginReducer
    }
})
export default store;