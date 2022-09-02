import { configureStore } from "@reduxjs/toolkit";
import Slice from "./Reducers/Slice";
import Users from "./Reducers/Users";

const store =configureStore({
    reducer:{
       admin:Slice,
       usersData:Users
    }
})
export default store;