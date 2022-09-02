import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
  name: "listdata",
  initialState: {
    islogin: false,
    editData: [],
    profilePic: "assets/img/default-Img.png",
    initialPic:null
  },
  reducers: {
    setInfo: (state, action) => {
      state.editData = action.payload;
    },
    updatePic: (state, action) => {
      state.profilePic = action.payload;
    },

  },
});

export const { updatePic,setInfo } = Slice.actions;

export default Slice.reducer;
