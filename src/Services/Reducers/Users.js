import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addApi, getApi } from "../../Middleware/Apis/Index";

// export const getData = createAsyncThunk("user/getdata",() => {
//   const result=getApi()
//   console.log(result)
//   return result
// });

// export const addData= createAsyncThunk("user/adddata", async (value) => {
//   return addApi(value)
// });

export const Users = createSlice({
  name: "users",
  initialState: {
    loading: false,
    show: false,
    newUser: {},
    deleteUser: {},
    updateUser: {},
    error: null,
  },
  reducers: {
    addData: (state, action) => {
      state.newUser = action.payload;
    },
    deleteData: (state, action) => {
      state.newUser = action.payload;
    },
    editData: (state, action) => {
      state.newUser = action.payload;
    },
  },
});

export const { addData, deleteData, editData } = Users.actions;
export default Users.reducer;
