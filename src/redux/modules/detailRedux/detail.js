const UPD_INPUT = "UPD_INPUT";
const UPD_INPUT_SHOW = "UPD_INPUT_SHOW";
const MODAL_SHOW = "MODAL_SHOW";
const UPD_COMMIT = "UPD_COMMIT";
const DEL_COMMIT = "DEL_COMMIT";

export const updInput = (payload) => {
  return {
    type: UPD_INPUT,
    payload,
  };
};
export const updInputShow = (payload) => {
  return {
    type: UPD_INPUT_SHOW,
    payload,
  };
};
export const modalShow = (payload) => {
  return {
    type: MODAL_SHOW,
    payload,
  };
};
export const updCommit = (payload) => {
  return {
    type: UPD_COMMIT,
    payload,
  };
};
export const delCommit = (payload) => {
  return {
    type: DEL_COMMIT,
    payload,
  };
};

const initalState = {
  updContentInput: "",
  ModalText: "",
  modalBool: false,
  updContentShow: false,
};

let Data = [];
let FakeData = [];

const detail = (state = initalState, action) => {
  switch (action.type) {
    case UPD_INPUT:
      return {
        ...state,
        updContentInput: action.payload,
      };
    case UPD_INPUT_SHOW:
      return {
        ...state,
        updContentShow: !state.updContentShow,
      };
    case MODAL_SHOW:
      return {
        ...state,
        ModalText: action.payload.modalMsg,
        modalBool: !state.modalBool,
        updContentShow: false,
      };
    case UPD_COMMIT:
      Data = JSON.parse(localStorage.getItem("data"));
      FakeData = JSON.parse(localStorage.getItem("fakeData"));
      const updData = Data.map((item) => {
        return item.id === action.payload.id
          ? { ...item, content: state.updContentInput }
          : item;
      });
      const updFakeData = FakeData.map((item) => {
        return item.id === action.payload.id
          ? { ...item, content: state.updContentInput }
          : item;
      });
      localStorage.setItem("data", JSON.stringify(updData));
      localStorage.setItem("fakeData", JSON.stringify(updFakeData));
      action.payload.navigate(`/?artistSort=${action.payload.artist}`);
      return {
        ...state,
        modalBool: !state.modalBool,
      };
    case DEL_COMMIT:
      Data = JSON.parse(localStorage.getItem("data"));
      FakeData = JSON.parse(localStorage.getItem("fakeData"));
      const delData = Data.filter((item) => {
        return item.id != action.payload.id;
      });
      const delFakeData = FakeData.filter((item) => {
        return item.id != action.payload.id;
      });
      localStorage.setItem("data", JSON.stringify(delData));
      localStorage.setItem("fakeData", JSON.stringify(delFakeData));
      action.payload.navigate(`/?artistSort=${action.payload.artist}`);
      return {
        ...state,
        modalBool: !state.modalBool,
      };
    default:
      return state;
      break;
  }
};

export default detail;
