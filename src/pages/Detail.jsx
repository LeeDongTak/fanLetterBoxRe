import React, { useEffect } from "react";
import { StWrap, StContainer } from "../styed/commonStyle";
import Modal from "../components/detail/Modal";
import Button from "../components/commom/Button";
import DetailHeader from "../components/detail/DetailHeader";
import DetailContainer from "../components/detail/DetailContainer";
import DetailBtnBox from "../components/detail/DetailBtnBox";
import { useSelector, useDispatch } from "react-redux";
import { __getFanLetter } from "../redux/modules/fanLetter";
import { useParams } from "react-router-dom";

function Detail() {
  const modal = useSelector((state) => state.modal);
  const fanLetter = useSelector((state) => state.fanLetter);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getFanLetter(id))
  },[]);
  return (
    <StWrap>
      {/* 모달창 */}
      {modal.modalBool === true ? <Modal /> : null}
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
