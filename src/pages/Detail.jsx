import React, { useState } from "react";
import { StWrap, StContainer } from "../styed/commonStyle";
import Modal from "../components/detail/Modal";
import Button from "../components/commom/Button";
import DetailHeader from "../components/detail/DetailHeader";
import DetailContainer from "../components/detail/DetailContainer";
import DetailBtnBox from "../components/detail/DetailBtnBox";
import { useSelector } from "react-redux";

function Detail() {
  
  const detail = useSelector((state) => state.detail);


  return (
    <StWrap>
      {/* 모달창 */}
      {detail.modalBool === true ? (
          <Modal />
      ) : null}
      <StContainer>
          <Button Sortation="홈" />
          <DetailHeader />
          <DetailContainer />
          <DetailBtnBox />
      </StContainer>
    </StWrap>
  );
}

export default Detail;
