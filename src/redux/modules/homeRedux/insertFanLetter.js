import { v4 } from "uuid";
import moment from "moment/moment";
import fakeData from "../../../fakeData.json";

// uuid로 랜덤한 id 생성
const uuid = () => {
  const tokens = v4().split("-");
  return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4];
};

// localStorage에서 data가져오기
let insertData = [];
let insertFakeData = [];
if (
  localStorage.getItem("data") === null &&
  localStorage.getItem("fakeData") === null
) {
  localStorage.setItem("data", JSON.stringify([]));
  localStorage.setItem("fakeData", JSON.stringify([...fakeData]));
  insertData = JSON.parse(localStorage.getItem("data"));
  insertFakeData = JSON.parse(localStorage.getItem("fakeData"));
} else if (localStorage.getItem("data") === null) {
  localStorage.setItem("data", JSON.stringify([]));
  insertData = JSON.parse(localStorage.getItem("data"));
  insertFakeData = JSON.parse(localStorage.getItem("fakeData"));
} else if (localStorage.getItem("fakeData") === null) {
  localStorage.setItem("fakeData", JSON.stringify([...fakeData]));
  insertData = JSON.parse(localStorage.getItem("data"));
  insertFakeData = JSON.parse(localStorage.getItem("fakeData"));
} else {
  insertData = JSON.parse(localStorage.getItem("data"));
  insertFakeData = JSON.parse(localStorage.getItem("fakeData"));
}

const URL_PARAMSARTIST = "URL_PARAMSARTIST";
const NICKNAME_CHAGE = "NICKNAME_CHAGE";
const CONTENT_CHAGE = "CONTENT_CHAGE";
const INSERT_COMMIT = "INSERT_COMMIT";
const INSERT_MSG_CHECK = "INSERT_MSG_CHECK";
const DATA_UPDATE = "DATA_UPDATE";

export const urlParamsArtist = (payload) => {
  return {
    type: URL_PARAMSARTIST,
    payload,
  };
};

export const nicknameChage = (payload) => {
  return {
    type: NICKNAME_CHAGE,
    payload,
  };
};

export const contentChage = (payload) => {
  return {
    type: CONTENT_CHAGE,
    payload,
  };
};

export const insertCommit = (payload) => {
  return {
    type: INSERT_COMMIT,
    payload,
  };
};

export const insertMsgCheck = (payload) => {
  return {
    type: INSERT_MSG_CHECK,
    payload,
  };
};

export const dataUpdate = (payload) => {
  return {
    type: DATA_UPDATE,
    payload,
  };
};

const initalState = {
  fanLetterData: [...insertData, ...insertFakeData],
  searchParamsArtist: "",
  nickNameInput: "", // 닉네임 인풋
  contentInput: "", // 컨텐츠 인풋
  errMsg: "",
  errMsgBool: false,
};
const insertFanLetter = (state = initalState, action) => {
  switch (action.type) {
    case URL_PARAMSARTIST:
      return {
        ...state,
        searchParamsArtist: action.payload,
      };
      break;
    case NICKNAME_CHAGE:
      return {
        ...state,
        nickNameInput: action.payload,
      };
      break;
    case CONTENT_CHAGE:
      return {
        ...state,
        contentInput: action.payload,
      };
      break;
    case INSERT_COMMIT:
      const fanLetter = {
        createdAt: moment().format("YYYY-MM-DD"),
        nickname: state.nickNameInput,
        avatar: "https://www.youthblg.org/common/img/default_profile.png",
        content: state.contentInput,
        writedTo: state.searchParamsArtist,
        id: uuid(),
      };
      if (state.nickNameInput.length === 0) {
        return {
          ...state,
          errMsg: "닉네임이 입력되지 않았습니다.",
          errMsgBool: true,
        };
      } else if (state.nickNameInput.length >= 10) {
        return {
          ...state,
          errMsg: "최대 10자까지 입력할 수 있습니다.",
          errMsgBool: true,
        };
      } else if (state.contentInput.length === 0) {
        return {
          ...state,
          errMsg: "팬레터가 입력되지 않았습니다.",
          errMsgBool: true,
        };
      } else if (state.contentInput.length >= 10) {
        return {
          ...state,
          errMsg: "최대 100자까지 입력할 수 있습니다.",
          errMsgBool: true,
        };
      } else {
        insertData.unshift(fanLetter);
        localStorage.setItem("data", JSON.stringify(insertData));
        let addData = [];
        addData = JSON.parse(localStorage.getItem("data"))
        if (addData.length < JSON.parse(localStorage.getItem("data"))) {
          console.log("안맞아!!!!")
        }
        return {
          ...state,
          fanLetterData: [...addData, ...insertFakeData],
          nickNameInput: "",
          contentInput: "",
          errMsg: "",
          errMsgBool: false,
        };
      }
      break;

      return {
        ...state,
        nickNameInput: action.payload,
      };
      break;
    case INSERT_MSG_CHECK:
      return {
        ...state,
        errMsg: "",
        errMsgBool: false,
      };
    case DATA_UPDATE:
      insertData = JSON.parse(localStorage.getItem("data"));
      insertFakeData = JSON.parse(localStorage.getItem("fakeData"));
      return {
        ...state,
        fanLetterData: [...insertData, ...insertFakeData],
      };
      break;
    default:
      return state;
      break;
  }
};

export default insertFanLetter;
