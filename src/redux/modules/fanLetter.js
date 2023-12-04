import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment/moment";
import api from "../../axios/api";
import { __getUser } from "./auth";

// 데이터 조회
export const __getFanLetter = createAsyncThunk(
  "getFanLetter",
  async (payload, thunkAPI) => {
    try {
      const responce = await api.get("/fanLetter");

      const detailData = responce.data.find((x) => x.id === payload);
      return thunkAPI.fulfillWithValue({ data: responce.data, detailData });
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// 데이터 추가
export const __addFanLetter = createAsyncThunk(
  "addFanLetter",
  async (payload, thunkAPI) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const fanLetter = {
        createdAt: moment().format("YYYY-MM-DD"),
        nickname: user.nickname,
        avatar: user.avatar,
        content: payload.contentInput,
        writedTo: payload.searchParams,
        userId: user.userId,
      };
      if (payload.contentInput.length === 0) {
        return thunkAPI.fulfillWithValue({
          data: [],
          errMsg: "팬레터가 입력되지 않았습니다.",
          errMsgShow: true,
        });
      } else if (payload.contentInput.length >= 10) {
        return thunkAPI.fulfillWithValue({
          data: [],
          errMsg: "최대 100자까지 입력할 수 있습니다.",
          errMsgShow: true,
        });
      } else {
        const getRes = await thunkAPI.dispatch(
          __getUser({
            navigate: payload.navigate,
            accessToken: user.accessToken,
          })
        );
        if (getRes.payload.status === 200) {
          const responce = await api.post("/fanLetter", fanLetter);
          return thunkAPI.fulfillWithValue({
            data: responce.data,
            errMsg: "",
            errMsgShow: false,
          });
        } else {
          return thunkAPI.rejectWithValue(getRes.payload.error);
        }
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// 데이터 수정
export const __updateFanLetter = createAsyncThunk(
  "updateFanLetter",
  async (payload, thunkAPI) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const getRes = await thunkAPI.dispatch(
        __getUser({
          navigate: payload.navigate,
          accessToken: user.accessToken,
        })
      );
      if (getRes.payload.status === 200) {
        const responce = await api.patch(`/fanLetter/${payload.id}`, {
          content: `${payload.updContentInput}`,
        });
        return thunkAPI.fulfillWithValue(responce.data);
      } else {
        return thunkAPI.rejectWithValue(getRes.payload.error);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// 데이터 삭제
export const __deleteFanLetter = createAsyncThunk(
  "deleteFanLetter",
  async (payload, thunkAPI) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const getRes = await thunkAPI.dispatch(
        __getUser({
          navigate: payload.navigate,
          accessToken: user.accessToken,
        })
      );
      if (getRes.payload.status === 200) {
        const responce = await api.delete(`/fanLetter/${payload.id}`);

        return thunkAPI.fulfillWithValue(payload.id);
      } else {
        return thunkAPI.rejectWithValue(getRes.payload.error);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  errMsg: "",
  errMsgBool: false,
  fanLetterData: [],
  detailData: {},
  updContentInput: "",
  // 데이터 가져오기
  isGetLoading: false,
  isGetError: false,
  getError: null,
  // 데이터 추가하기
  isAddLoading: false,
  isAddError: false,
  addError: null,
  // 데이터 수정하기
  isUpdateLoading: false,
  isUpdateError: false,
  updateError: null,
  // 데이터 삭제하기
  isDeleteLoading: false,
  isDeleteError: false,
  deleteError: null,
};

const fanLetter = createSlice({
  name: "fanLetter",
  initialState,
  reducers: {
    updInput: (state, action) => {
      state.updContentInput = action.payload;
    },
    urlParamsArtist: (state, action) => {
      state.searchParamsArtist = action.payload;
    },
    insertCommit: (state, action) => {},
    insertMsgCheck: (state, action) => {
      state.errMsg = "";
      state.errMsgBool = false;
    },
    dataUpdate: (state, action) => {
      // insertData = JSON.parse(localStorage.getItem("data"));
      // insertFakeData = JSON.parse(localStorage.getItem("fakeData"));
      // return {
      //   ...state,
      //   fanLetterData: [...insertData, ...insertFakeData],
      // };
    },
  },
  extraReducers: (builder) => {
    builder
      // fanLetterData불러오기 로딩중
      .addCase(__getFanLetter.pending, (state, action) => {
        state.isGetLoading = true;
        state.isGetError = false;
      })
      // fanLetterData불러오기 성공
      .addCase(__getFanLetter.fulfilled, (state, action) => {
        action.payload.data.sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return -1;
          } else if (a.createdAt < b.createdAt) {
            return 1;
          } else {
            return 0;
          }
        });
        state.updContentInput =
          action.payload.detailData === undefined
            ? state.updContentInput
            : action.payload.detailData.content;
        state.fanLetterData = action.payload.data;
        state.detailData =
          action.payload.detailData === undefined
            ? state.detailData
            : action.payload.detailData;
        state.isGetLoading = false;
        state.isGetError = false;
      })
      // fanLetterData불러오기 실패
      .addCase(__getFanLetter.rejected, (state, action) => {
        state.isGetLoading = false;
        state.isGetError = true;
        state.getError = action.payload;
      })

      // fanLetterData추가하기 로딩중
      .addCase(__addFanLetter.pending, (state, action) => {
        state.isAddLoading = true;
        state.isAddError = false;
      })
      // fanLetterData추가하기 성공
      .addCase(__addFanLetter.fulfilled, (state, action) => {
        const addData = [action.payload.data, ...state.fanLetterData];
        addData.sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return -1;
          } else if (a.createdAt < b.createdAt) {
            return 1;
          } else {
            return 0;
          }
        });
        console.log(action.payload.data);
        state.fanLetterData =
          action.payload.data.length === 0 ? state.fanLetterData : [...addData];
        state.errMsg = action.payload.errMsg;
        state.errMsgBool = action.payload.errMsgShow;
        state.isAddLoading = false;
        state.isAddError = false;
      })
      // fanLetterData추가하기 실패
      .addCase(__addFanLetter.rejected, (state, action) => {
        state.isAddLoading = false;
        state.isAddError = true;
        state.addError = action.payload;
      })

      // fanLetterData수정하기 로딩중
      .addCase(__updateFanLetter.pending, (state, action) => {
        state.isUpdateLoading = true;
        state.isUpdateError = false;
      })
      // fanLetterData수정하기 성공
      .addCase(__updateFanLetter.fulfilled, (state, action) => {
        const updData = state.fanLetterData.map((item) => {
          return item.id === action.payload.id ? { ...action.payload } : item;
        });
        state.fanLetterData = [...updData];
        state.updContentInput = action.payload.content;
        state.detailData = { ...action.payload };
        state.isUpdateLoading = false;
        state.isUpdateError = false;
      })
      // fanLetterData수정하기 실패
      .addCase(__updateFanLetter.rejected, (state, action) => {
        console.log(state.detailData)
        state.detailData = state.detailData;
        state.isUpdateLoading = false;
        state.isUpdateError = true;
        state.updateError = action.payload;
      })

      // fanLetterData삭제하기 로딩중
      .addCase(__deleteFanLetter.pending, (state, action) => {
        state.isDeleteLoading = true;
        state.isDeleteError = false;
      })
      // fanLetterData삭제하기 성공
      .addCase(__deleteFanLetter.fulfilled, (state, action) => {
        const delData = state.fanLetterData.filter((item) => {
          return item.id !== action.payload;
        });
        state.fanLetterData = [...delData];
        state.isDeleteLoading = false;
        state.isDeleteError = false;
      })
      // fanLetterData삭제하기 실패
      .addCase(__deleteFanLetter.rejected, (state, action) => {
        state.isDeleteLoading = false;
        state.isDeleteError = true;
        state.deleteError = action.payload;
      });
  },
});

export const {
  urlParamsArtist,
  insertCommit,
  insertMsgCheck,
  dataUpdate,
  updInput,
} = fanLetter.actions;
export default fanLetter.reducer;
