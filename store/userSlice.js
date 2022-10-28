import { createSlice } from "@reduxjs/toolkit";

const initData = {
  userList: [],
  userData: {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    date: null,
  },
};

const userSlice = createSlice({
  name: "userData",
  initialState: initData,
  reducers: {
    addUser: (state, action) => {
      state.userList = action.payload;
    },

    deleteUser(state, action) {
      state.userList = state.userList.filter((item) => item?.id !== action.payload)
    },
    updateUser(state, action) {
      state.userList = action.payload;
    },
  },
});

export const { addUser, updateUser, deleteUser } =
  userSlice.actions;

export default userSlice.reducer;
