import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { __getFanLetter } from "../../redux/modules/fanLetter";

function DetailHeader() {
  const fanLetter = useSelector((state) => state.fanLetter);
  const [searchParams, setSearchParams] = useSearchParams();
  
  return (
    <Header>
      <ImgBox>
        <Img src={fanLetter.detailData.avatar} alt="" />
      </ImgBox>
      <NickNameBox>{fanLetter.detailData.nickname}</NickNameBox>
      <DateBox>{fanLetter.detailData.createdAt}</DateBox>
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