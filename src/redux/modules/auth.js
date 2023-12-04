import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import signUpApi from "../../axios/logInApi";
import api from "../../axios/api";
import axios from "axios";

// 회원가입
export const __signUpUser = createAsyncThunk(
  "SignUpUser",
  async (payload, thunkAPI) => {
    try {
      const user = {
        id: payload.id,
        password: payload.pw,
        nickname: payload.nickName,
      };
      if (payload.id.length > 10) {
        return thunkAPI.rejectWithValue({message:"id는 10글자 이하의 문자열이어야 합니다."});
      }else if (payload.pw.length > 15) {
        return thunkAPI.rejectWithValue({message:"password는 15글자 이하의 문자열이어야 합니다."});
      }else if (payload.nickName.length > 10) {
        return thunkAPI.rejectWithValue({message:"닉네임은 10글자 이하의 문자열이어야 합니다."});
      }
      const res = await signUpApi.post(`/register`, user);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// 로그인
export const __signInUser = createAsyncThunk(
  "SignInUser",
  async (payload, thunkAPI) => {
    try {
      const user = {
        id: payload.id,
        password: payload.pw,
      };
      const res = await signUpApi.post(`/login`, user);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// 회원정보 확인
export const __getUser = createAsyncThunk(
  "getUser",
  async (payload, thunkAPI) => {
    try {
      const res = await signUpApi.get(`/user`, {
        headers: {
          Authorization: `Bearer ${payload.accessToken}`,
        },
      });
      return thunkAPI.fulfillWithValue(res);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({
        error: error.response.data,
        navigate: payload.navigate,
      });
    }
  }
);
// 회원정보 수정
export const __updateUser = createAsyncThunk(
  "updateUser",
  async (payload, thunkAPI) => {
    try {
      var limitSize = 1024 * 1024; //1mb(메가)

      if (limitSize < payload.imgFile.size) {
        return thunkAPI.rejectWithValue({
          message: "1MB이상의 파일은 업로드 할 수 없습니다.",
        });
      } else if (payload.nickNameInput === "") {
        return thunkAPI.rejectWithValue({ message: "닉네임을 입력하세요" });
      } else if (payload.nickNameInput.length >= 10) {
        return thunkAPI.rejectWithValue({
          message: "닉네임은 10글자 이하로 작성해 주세요",
        });
      } else {
        const formData = new FormData();
        formData.append("avatar", payload.imgFile);
        formData.append("nickname", payload.nickNameInput);

        const res = await signUpApi.patch(`/profile`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${payload.accessToken}`,
          },
        });
        for (let i = 0; i < payload.myLettersData.length; i++) {
          await api.patch(`/fanLetter/${payload.myLettersData[i].id}`, {
            nickname: res.data.nickname,
            avatar: res.data.avatar
          });
        }

        return thunkAPI.fulfillWithValue({
          res,
          setUpdFocus: payload.setUpdFocus,
        });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  user: {},
  signInBtnClick: false,
  signInsuccess: false,
  signUpsuccess: false,
  isSuccess: false,
  successMessage: "",
  isLoading: false,
  isError: false,
  error: "",
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    modalClose: (state, action) => {
      state.isError = false;
      state.signUpsuccess = false;
      state.signInsuccess = false;
      state.isSuccess = false;
      state.error = "";
      state.successMessage = '';
      state.signInBtnClick = false;
    },
    userImgURLChange: (state, action) => {
      state.user.avatar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 회원가입
      // 회원가입 로딩중
      .addCase(__signUpUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.signUpsuccess = false;
        state.signInBtnClick = false;
        state.isSuccess = false;
      })
      // 회원가입 성공
      .addCase(__signUpUser.fulfilled, (state, action) => {
        state.signUpsuccess = action.payload.success;
        state.successMessage = action.payload.message;
        state.isLoading = false;
        state.isError = false;
        state.signInBtnClick = false;
        state.isSuccess = false;
      })
      // 회원가입 실패
      .addCase(__signUpUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.isError = true;
        state.signUpsuccess = false;
        state.signInBtnClick = false;
        state.isSuccess = false;
      })

      // 로그인
      // 로그인 로딩중
      .addCase(__signInUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.signInsuccess = false;
        state.signInBtnClick = true;
        state.isSuccess = false;
      })
      // 로그인 성공
      .addCase(__signInUser.fulfilled, (state, action) => {
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.signInsuccess = action.payload.success;
        state.user = action.payload;
        state.successMessage = "로그인 성공";
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.signInBtnClick = true;
      })
      // 로그인 실패
      .addCase(__signInUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.signInsuccess = false;
        state.signInBtnClick = true;
      })

      // 회원 정보 확인
      // 회원 정보 확인 로딩중
      .addCase(__getUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.signInsuccess = false;
        state.signInBtnClick = false;
      })
      // 회원 정보 확인 성공
      .addCase(__getUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.successMessage = "";
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
        state.signInBtnClick = false;
      })
      // 회원 정보 확인 실패
      .addCase(__getUser.rejected, (state, action) => {
        localStorage.clear();
        action.payload.navigate("/login");
        state.user = {};
        state.error = action.payload.error.message;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.signInsuccess = false;
        state.signInBtnClick = true;
      })

      // 회원 정보 수정
      // 회원 정보 수정 로딩중
      .addCase(__updateUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.signInsuccess = false;
        state.signInBtnClick = false;
      })
      // 회원 정보 수정 성공
      .addCase(__updateUser.fulfilled, (state, action) => {
        const LSUser = JSON.parse(localStorage.getItem("user"));
        const newLSUser = {
          ...LSUser,
          nickname: action.payload.res.data.nickname,
          avatar: action.payload.res.data.avatar,
        };
        localStorage.setItem("user", JSON.stringify(newLSUser));
        action.payload.setUpdFocus(false);
        state.user.nickname =
          action.payload.res.data.nickname === undefined
            ? state.user.nickname
            : action.payload.res.data.nickname;
        state.user.avatar =
          action.payload.res.data.avatar === undefined
            ? state.user.avatar
            : action.payload.res.data.avatar;
        state.successMessage = "프로필 수정이 완료되었습니다. ";
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.signInBtnClick = false;
      })
      // 회원 정보 수정 실패
      .addCase(__updateUser.rejected, (state, action) => {
        state.error = action.payload.message;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.signInsuccess = false;
        state.signInBtnClick = false;
      });
  },
});

export const { modalClose, userImgURLChange } = auth.actions;
export default auth.reducer;
