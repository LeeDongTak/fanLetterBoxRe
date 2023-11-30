import React, { useContext } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function DetailHeader() {
  const insertFanLetter = useSelector((state) => state.insertFanLetter);
  const { id } = useParams();
  const fanLetterData = [...insertFanLetter.fanLetterData];
  const resultData = fanLetterData.find((x) => x.id === id);
  
  return (
    <Header>
      <ImgBox>
        <Img src={resultData.avatar} alt="" />
      </ImgBox>
      <NickNameBox>{resultData.nickname}</NickNameBox>
      <DateBox>{resultData.createdAt}</DateBox>
    </Header>
  );
}

export default DetailHeader;


// 이미지, 닉네임, 날짜 영역
const Header = styled.div`
  width: 80%;
  flex: 1;
  display: flex;
  background-color: rgba(0, 0, 0, 0.7);
  box-shadow: 0 0 5px 2px #fff;
  border-radius: 5px;
`;

const ImgBox = styled.div`
  flex: 2;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
  width: 25%;
  border-radius: 50px;
  border: 1px solid #000;
`;
const NickNameBox = styled.div`
  flex: 3;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
`;
const DateBox = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: bold;
`;