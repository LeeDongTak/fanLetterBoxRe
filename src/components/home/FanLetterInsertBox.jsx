import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "../commom/Button";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __addFanLetter } from "../../redux/modules/fanLetter";
import { searchMsgCheck } from "../../redux/modules/searchFanLetter";
import { useSearchParams } from "react-router-dom";

function FanLetterInsertBox() {
  const [nickName, setNickName] = useState("");
  const [contentInput, setContentinput] = useState("");
  const contentRef = useRef(null);
  const fanLetter = useSelector((state) => state.fanLetter);
  const searchFanLetter = useSelector((state) => state.searchFanLetter);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const contentinputChage = (e) => {
    setContentinput(e.target.value);
  };

  useEffect(() => {
    contentRef.current.focus();
    if (localStorage.getItem("user") !== null) {
      const user = JSON.parse(localStorage.getItem("user"));
      setNickName(user?.nickname);
    }
  }, []);

  return (
    <InputBox>
      <TitleBox>
        {fanLetter.searchParamsArtist}
        에게 팬레터 보내기
      </TitleBox>
      {fanLetter.errMsgBool === true ? (
        <ErrMsg>{fanLetter.errMsg}</ErrMsg>
      ) : null}
      {searchFanLetter.searchErrBool === true ? (
        <ErrMsg>{searchFanLetter.searchErrMsg}</ErrMsg>
      ) : null}
      <ListInsertNickName>{nickName}</ListInsertNickName>
      <ListInsertContent
        value={contentInput}
        placeholder="내용을 입력하세요"
        onChange={contentinputChage}
        cols="30"
        rows="5"
        ref={contentRef}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            dispatch(searchMsgCheck());
            dispatch(
              __addFanLetter({
                searchParams: searchParams.get("artistSort"),
                contentInput,
              })
            );
            setContentinput("");
          }
        }}
      ></ListInsertContent>
      <Button
        Sortation="팬레터 등록"
        contentInput={contentInput}
        setContentinput={setContentinput}
      />
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

const ListInsertNickName = styled.div`
  width: 80%;
  margin-top: 10%;
  padding: 2%;
  border: 0;
  border-radius: 5px;
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
  background: rgba(255, 255, 255, 0.8);
  transition: 0.2s;
  &:focus {
    background: rgba(255, 255, 255, 1);
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
