import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __getFanLetter,updInput } from "../../redux/modules/fanLetter";

function DetailContainer() {
  const fanLetter = useSelector((state) => state.fanLetter);
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  
  const updContentInputHeadler = (e) => {
    dispatch(updInput(`${e.target.value}`));
  };
  return (
    <Container>
      <ArtistName>{fanLetter.detailData.writedTo} 팬레터 함</ArtistName>
      {modal.updContentShow === false ? (
        <FanLetter>{fanLetter.detailData.content}</FanLetter>
      ) : (
        <UpdFanLetter
          onChange={updContentInputHeadler}
          value={fanLetter.updContentInput}
          cols="30"
          rows="10"
        ></UpdFanLetter>
      )}
    </Container>
  );
}

export default DetailContainer;

// 내용 영역
const Container = styled.div`
  width: 100%;
  flex: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
const ArtistName = styled.div`
  width: 80%;
  flex: 2;
  font-size: 1.8rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const FanLetter = styled.div`
  width: 72%;
  flex: 5;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 4%;
  box-shadow: 0 0 5px 2px #fff;
  border-radius: 5px;
  font-size: 1.3rem;
`;

const UpdFanLetter = styled.textarea`
  width: 72%;
  flex: 5;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 4%;
  border-radius: 10px;
  font-size: 1.3rem;
  color: #fff;
  box-shadow: 0 0 10px 0 #fff;
`;
