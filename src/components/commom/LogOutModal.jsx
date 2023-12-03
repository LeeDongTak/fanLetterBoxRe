import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function LogOutModal({ setLogOutModal }) {
  const navigate = useNavigate();
  const logOutClickHandler = () => {
    setLogOutModal(false);
    localStorage.clear();
    navigate("/login");
  };
  return (
    <ModalWrap>
      <ModalBg
        onClick={() => {
          setLogOutModal(false);
        }}
      />
      <ModalBox>
        <ModalText>정말로 로그아웃 하시겠습니까?</ModalText>

        <ModalBtnBox>
          <StButton onClick={logOutClickHandler}>확인</StButton>
          <StButton
            onClick={() => {
              setLogOutModal(false);
            }}
          >
            취소
          </StButton>
        </ModalBtnBox>
      </ModalBox>
    </ModalWrap>
  );
}

export default LogOutModal;

const ModalWrap = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 104;
`;

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 105;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
`;
const ModalBox = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: 33%;
  z-index: 106;
  padding: 0 4%;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  box-shadow: 0 0 5px 2px #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalText = styled.div`
  width: 100%;
  color: #fff;
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
`;

const ModalBtnBox = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const StButton = styled.button`
  width: auto;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 1.1rem;
  padding: 3% 8%;
  border: 0;
  border-radius: 5px;
  box-shadow: 0 0 5px 2px #fff;
  margin-top: 0;
  margin-left: 0;
  margin-right: 5%;
  font-weight: bold;
  transition: 0.1s;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #000;
  }
`;
