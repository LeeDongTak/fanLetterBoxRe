import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __signInUser } from "../../redux/modules/auth";

function SignIn({ setSignUpToggle }) {
  const dispatch = useDispatch();
  const [idInput, setIdInput] = useState("");
  const [pwInput, setPwInput] = useState("");
  const idRef = useRef(null);

  const inputHandler = (e, setState) => {
    setState(e.target.value);
  };
  
  useEffect(()=>{
    idRef.current.focus()
  },[])
  return (
    <StSignInWrap>
      <StLogInTitle>로그인</StLogInTitle>
      <StLogInInput
        type="text"
        value={idInput}
        placeholder="아이디를 입력하세요"
        ref={idRef}
        onChange={(e) => {
          inputHandler(e, setIdInput);
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            dispatch(__signInUser({ id: idInput, pw: pwInput }));
          }
        }}
      />
      <StLogInInput
        type="password"
        value={pwInput}
        placeholder="비밀번호를 입력하세요"
        onChange={(e) => {
          inputHandler(e, setPwInput);
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            dispatch(__signInUser({ id: idInput, pw: pwInput }));
          }
        }}
      />
      <StLogInButton
        onClick={() => {
          dispatch(__signInUser({ id: idInput, pw: pwInput }));
        }}
      >
        로그인
      </StLogInButton>
      <StsignupButton>
        <StSpan
          onClick={() => {
            setSignUpToggle(true);
          }}
        >
          회원가입
        </StSpan>
      </StsignupButton>
    </StSignInWrap>
  );
}

export default SignIn;

const StSignInWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const StLogInTitle = styled.div`
  width: 68%;
  font-size: 4rem;
  margin-bottom: 8%;
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  text-shadow: 0 0 5px #fff;
`;
const StLogInInput = styled.input`
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
    outline: none;
  background: rgba(255, 255, 255, 1);
    box-shadow: 0 0 10px 2px #fff;
  }
`;
const StLogInButton = styled.button`
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
