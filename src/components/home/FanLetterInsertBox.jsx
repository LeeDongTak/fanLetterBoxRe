import React, { useContext, useEffect, useState } from "react";
import Button from "../commom/Button";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { insertCommit } from "../../redux/modules/homeRedux/insertFanLetter";
import { searchMsgCheck } from "../../redux/modules/homeRedux/searchFanLetter";
import {
  nicknameChage,
  contentChage,
} from "../../redux/modules/homeRedux/insertFanLetter";

function FanLetterInsertBox({ nickNameRef }) {
  const insertFanLetter = useSelector((state) => state.insertFanLetter);
  const searchFanLetter = useSelector((state) => state.searchFanLetter);
  const dispatch = useDispatch();

  const nickNameinputChage = (e) => {
    dispatch(nicknameChage(e.target.value));
  };
  const contentinputChage = (e) => {
    dispatch(contentChage(e.target.value));
  };

  return (
    <InputBox>
      <TitleBox>
        {insertFanLetter.searchParamsArtist}
        에게 팬레터 보내기
      </TitleBox>
      {insertFanLetter.errMsgBool === true ? (
        <ErrMsg>{insertFanLetter.errMsg}</ErrMsg>
      ) : null}
      {searchFanLetter.searchErrBool === true ? (
        <ErrMsg>{searchFanLetter.searchErrMsg}</ErrMsg>
      ) : null}
      <ListInsertNickName
        value={insertFanLetter.nickNameInput}
        placeholder="닉네임을 입력하세요"
        type="text"
        onChange={nickNameinputChage}
        ref={nickNameRef}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            dispatch(insertCommit());
            dispatch(searchMsgCheck());
          }
        }}
      />
      <ListInsertContent
        value={insertFanLetter.contentInput}
        placeholder="내용을 입력하세요"
        onChange={contentinputChage}
        cols="30"
        rows="5"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            dispatch(insertCommit());
            dispatch(searchMsgCheck());
          }
        }}
      ></ListInsertContent>
      <Button Sortation="팬레터 등록" />
    </InputBox>
  );
}

export default FanLetterInsertBox;

// style
// input 영역
const InputBox = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const TitleBox = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.8rem;
  text-shadow: 0 0 5px #fff;
`;

const ListInsertNickName = styled.input`
  width: 80%;
  margin-top: 10%;
  padding: 2%;
  border: 0;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.7);
  font-size: 1.3rem;
  transition: 0.2s;
  &:focus {
    outline: none;
    box-shadow: 0 0 5px 2px #fff;
  }
`;

const ListInsertContent = styled.textarea`
  width: 80%;
  border-radius: 5px;
  margin-top: 10%;
  padding: 2%;
  font-size: 1.3rem;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.7);
  transition: 0.2s;
  &:focus {
    outline: none;
    box-shadow: 0 0 5px 2px #fff;
  }
`;

// 에러 메시지
const ErrMsg = styled.p`
  color: #f66;
  font-weight: bold;
  font-size: 1.1rem;
  text-shadow: 0px 0px 5px #ccc;
`;
