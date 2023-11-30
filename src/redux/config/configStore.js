import { createStore } from "redux";
import { combineReducers } from "redux";
import artistBtn from "../modules/homeRedux/artistBtn";
import insertFanLetter from "../modules/homeRedux/insertFanLetter";
import searchFanLetter from "../modules/homeRedux/searchFanLetter";
import detail from "../modules/detailRedux/detail";

const rootReducer = combineReducers({ artistBtn, insertFanLetter,searchFanLetter, detail });
const store = createStore(rootReducer);

export default store;
