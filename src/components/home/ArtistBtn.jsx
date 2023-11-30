import React, { useContext, useState } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { memberCoice } from "../../redux/modules/homeRedux/artistBtn";

function ArtistBtn() {
  const dispatch = useDispatch()
  
  const artistBtn = useSelector((state)=>state.artistBtn)
  return (
    <HeaderWrap>
      {artistBtn.artistMember.map((item) => {
        return (
          <Button
            $background={item.artistImg}
            onClick={() => {
              dispatch(memberCoice(item.id));
            }}
            key={item.id}
          >
            <BtnFocus $btnclick={item.status}>{item.artistName}</BtnFocus>
          </Button>
        );
      })}
    </HeaderWrap>
  );
}

export default ArtistBtn;

// 버튼 영역(header)
const HeaderWrap = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  border-radius: 5px;
`;

const Button = styled.div`
  width: 20%;
  height: 100%;
  background-image: url(${(props) => props.$background});
  background-size: cover;
  cursor: pointer;
  border-radius: 5px;
`;

const BtnFocus = styled.p`
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    props.$btnclick ? "none" : "rgba(0,0,0,0.4)"};
  box-shadow: inset 0 0 ${(props) => (props.$btnclick ? "70px" : "100px")} 0
    ${(props) => (props.$btnclick ? "#fff" : "#000")};
  box-sizing: border-box;
  display: flex;
  align-items: self-end;
  padding-bottom: 10%;
  justify-content: center;
  font-weight: bold;
  font-size: 1.3rem;
  border-radius: 5px;
  text-shadow: 0 0 5px #fff;
`;
