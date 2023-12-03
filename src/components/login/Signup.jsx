import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { __signUpUser } from "../../redux/modules/auth";

function Signup({ setSignUpToggle }) {
  const dispatch = useDispatch();
  const [idInput, setIdInput] = useState("");
  const [pwInput, setPwInput] = useState("");
  const [nickNameInput, setNickNameInput] = useState("");
  const idRef = useRef(null);

  const inputHandler = (e, setState) => {
    setState(e.target.value);
  };

  useEffect(()=>{
    idRef.current.focus()
  },[])
  return (
    <StSignUpWrap>
      <StBackButton
        onClick={() => {
          setSignUpToggle(false);
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </StBackButton>
      <StSignUpTitle>회원가입</StSignUpTitle>
      <StSignUpInput
        type="text"
        placeholder="아이디를 입력하세요"
        ref={idRef}
        value={idInput}
        onChange={(e) => {
          inputHandler(e, setIdInput);
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            dispatch(
              __signUpUser({
                id: idInput,
                pw: pwInput,
                nickName: nickNameInput,
              })
            );
          }
        }}
      />
      <StSignUpInput
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={pwInput}
        onChange={(e) => {
          inputHandler(e, setPwInput);
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            dispatch(
              __signUpUser({
                id: idInput,
                pw: pwInput,
                nickName: nickNameInput,
              })
            );
          }
        }}
      />
      <StSignUpInput
        type="text"
        placeholder="닉네임을 입력하세요"
        value={nickNameInput}
        onChange={(e) => {
          inputHandler(e, setNickNameInput);
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            dispatch(
              __signUpUser({
                id: idInput,
                pw: pwInput,
                nickName: nickNameInput,
              })
            );
          }
        }}
      />
      <StSignUpButton
        onClick={() => {
          dispatch(
            __signUpUser({ id: idInput, pw: pwInput, nickName: nickNameInput })
          );
        }}
      >
        회원가입
      </StSignUpButton>
    </StSignUpWrap>
  );
}

export default Signup;

const StSignUpWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const StBackButton = styled.button`
  position: fixed;
  top: 0;
  left: 0;
  width: 5rem;
  height: 3rem;
  font-size: 1.5rem;
  border-radius: 7px;
  background-color: rgba(0, 0, 0, 0.7);
  margin-bottom: 3%;
  box-shadow: 0 0 5px 2px #fff;
  color: #fff;
  border: 0;
  font-weight: bold;
  transition: 0.1s;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #000;
  }
`;
const StSignUpTitle = styled.div`
  width: 68%;
  font-size: 4rem;
  margin-bottom: 8%;
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  text-shadow: 0 0 5px #fff;
`;
const StSignUpInput = styled.input`
  width: 65%;
  margin-bottom: 7%;
  padding: 2%;
  font-size: 1.8rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
  border: 0;
  box-shadow: 0 0 5px 2px #fff;
  transition: 0.2s;
  &:focus {
    background: rgba(255, 255, 255, 1);
    outline: none;
    box-shadow: 0 0 10px 2px #fff;
  }
`;
const StSignUpButton = styled.button`
  width: 69%;
  padding: 2%;
  font-size: 1.8rem;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  margin-bottom: 3%;
  box-shadow: 0 0 5px 2px #fff;
  color: #fff;
  border: 0;
  font-weight: bold;
  transition: 0.1s;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

const StsignupButton = styled.div`
  width: 68%;
  padding: 2%;
  display: flex;
  justify-content: flex-end;
  text-shadow: 0 0 5px #fff;
`;
const StSpan = styled.span`
  transition: 0.1s;
  cursor: pointer;
  &:hover {
    color: #f00;
  }
`;
