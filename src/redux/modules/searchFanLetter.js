import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchInput: "",
  searchErrMsg: "",
  searchErrBool: false,
};
const searchFanLetter = createSlice({
  name: "searchFanLetter",
  initialState,
  reducers: {
    searchChage: (state, action) => {
      state.searchInput = action.payload;
    },
    searchCommit: (state, action) => {
      if (state.searchInput === undefined || state.searchInput === "") {
        state.searchInput = "";
        state.searchErrMsg = "검색어 입력되지 않았습니다.";
        state.searchErrBool = true;
      } else if (state.searchInput !== undefined || state.searchInput !== "") {
        state.searchErrBool = false;
        state.searchErrMsg = "";
      }
    },
    searchReset: (state, action) => {
      state.searchInput = "";
      state.searchErrMsg = "";
      state.searchErrBool = false;
    },
    searchMsgCheck: (state, action) => {
      state.searchErrMsg = "";
      state.searchErrBool = false;
    },
  },
});

export const { searchChage, searchCommit, searchReset, searchMsgCheck } =
  searchFanLetter.actions;
export default searchFanLetter.reducer;
