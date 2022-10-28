import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import user from "./userSlice";

export const store = configureStore({
  reducer: {
    user,
  },
});
