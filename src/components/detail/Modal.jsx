import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Button from "../commom/Button";
import { useDispatch, useSelector } from "react-redux";
import { modalShow } from "../../redux/modules/detailRedux/detail";

function Modal() {
  const detail = useSelector((state) => state.detail);
  const dispatch = useDispatch();
  return (
    <ModalWrap>
      <ModalBg
        onClick={() => {
          dispatch(modalShow({ modalMsg: "", modalBool: false }));
        }}
      ></ModalBg>
      <ModalBox>
        <ModalText>{detail.ModalText}</ModalText>
        <ModalBtnBox>
          {detail.ModalText === "정말로 수정하시겠습니까?" ? (
            <Button Sortation="수정확인" />
          ) : (
            <Button Sortation="삭제확인" />
          )}
          <Button Sortation="모달취소" />
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
  z-index: 100;
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
