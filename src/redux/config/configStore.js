import { createStore } from "redux";
import { combineReducers } from "redux";
import artistBtn from "../modules/artistBtn";
import fanLetter from "../modules/fanLetter";
import searchFanLetter from "../modules/searchFanLetter";
import modal from "../modules/modal";
import auth from "../modules/auth";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    artistBtn,
    fanLetter,
    searchFanLetter,
    modal,
    auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
