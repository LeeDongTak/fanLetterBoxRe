const SEARCH_CHAGE = "SEARCH_CHAGE";
const SEARCH_COMMIT = "SEARCH_COMMIT";
const SEARCH_RESET = "SEARCH_RESET";
const SEARCH_MSG_CHECK = "SEARCH_MSG_CHECK";

export const searchChage = (payload) => {
  return {
    type: SEARCH_CHAGE,
    payload,
  };
};

export const searchCommit = (payload) => {
  return {
    type: SEARCH_COMMIT,
    payload,
  };
};

export const searchReset = (payload) => {
  return {
    type: SEARCH_RESET,
    payload,
  };
};

export const searchMsgCheck = (payload) => {
  return {
    type: SEARCH_MSG_CHECK,
    payload,
  };
};

const initalState = {
  searchInput: "",
  searchErrMsg: "",
  searchErrBool: false,
};
console.log(initalState.searchInput)

const searchFanLetter = (state = initalState, action) => {
  switch (action.type) {
    case SEARCH_CHAGE:
      return {
        ...state,
        searchInput: action.payload,
      };
    case SEARCH_COMMIT:
      if (state.searchInput === undefined || state.searchInput === '') {
        return {
          ...state,
          searchInput: "",
          searchErrMsg: "검색어 입력되지 않았습니다.",
          searchErrBool: true,
        };
      } else if (state.searchInput !== undefined || state.searchInput !== ''){
        return {
          ...state,
          searchErrBool: false,
          searchErrMsg: "",
        };
      }
    case SEARCH_RESET:
      action.payload.navigate(`/?artistSort=${action.payload.artistParams}`);
      return {
        ...state,
        searchInput: "",
        searchErrMsg: "",
        searchErrBool: false,
      };
    case SEARCH_MSG_CHECK:
      return {
        ...state,
        searchErrMsg: "",
        searchErrBool: false,
      };
    default:
      return state;
      break;
  }
};

export default searchFanLetter;
