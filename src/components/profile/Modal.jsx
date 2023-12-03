import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { modalClose } from "../../redux/modules/auth";
import { useNavigate } from "react-router-dom";

function Modal({ setSignUpToggle }) {
  const auth = useSelector((state) => state.auth);
  const BtnRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    BtnRef.current.focus();
  });
  return (
    <ModalWrap>
      <ModalBg
        onClick={() => {
          dispatch(modalClose());
        }}
      ></ModalBg>
      <ModalBox>
        <ModalText>
          {auth.isError === true ? auth.error : auth.successMessage}
        </ModalText>

        <ModalBtnBox>
          <StButton
            onClick={() => {
              dispatch(modalClose());
            }}
            onkeyUp={(e) => {
              if (e.key === "Enter") {
                dispatch(modalClose());
              }
            }}
            ref={BtnRef}
          >
            확인
          </StButton>
          }
          
        </ModalBtnBox>
      </ModalBox>
    </ModalWrap>
  );
}

export default Modal;

const ModalWrap = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 103;
`;

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 101;
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
  z-index: 102;
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
