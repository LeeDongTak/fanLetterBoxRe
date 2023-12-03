import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  updContentInput: "",
  ModalText: "",
  modalBool: false,
  updContentShow: false,
  updBtn: false,
};

const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    updInputShow: (state, action) => {
      state.updContentShow = !state.updContentShow;
    },
    modalShow: (state, action) => {
      state.ModalText = action.payload.modalMsg;
      state.modalBool = !state.modalBool;
      state.updContentShow = false;
      state.updBtn = action.payload.updBtn;
    },
  },
});

export const { updInput, updInputShow, modalShow } = modal.actions;
export default modal.reducer;
