import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { updInput } from "../../redux/modules/detailRedux/detail";


function FanLetter({ fanLetterData }) {
  const dispathch = useDispatch();
  const navigate = useNavigate();
  return (
    <ListElement
      onClick={() => {
        navigate(`/detail/${fanLetterData.id}`);
        dispathch(updInput(fanLetterData.content))
      }}
    >
      <ImgBox>
        <Img src={fanLetterData.avatar} alt="" />
      </ImgBox>
      <ContentBox>
        <TextContent>{fanLetterData.nickname}</TextContent>
        <TextContent>{fanLetterData.content}</TextContent>
        <TextContent>{fanLetterData.createdAt}</TextContent>
      </ContentBox>
    </ListElement>
  );
}

export default FanLetter;

const ListElement = styled.li`
  width: 90%;
  height: 25%;
  margin-top: 5%;
  border-radius: 5px;
  display: flex;
  box-shadow: 0 0 5px 2px #fff;
  cursor: pointer;
  transition: 0.1s;
  background-color: rgba(0, 0, 0, 0.7);
  &:hover {
    border: 1px solid #555;
    box-shadow: 0 0 10px 3px #fff;
  }
`;

const ImgBox = styled.div`
  width: 20%;
  height: 120px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Img = styled.img`
  width: 70%;
  border-radius: 50%;
`;

const ContentBox = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  padding: 0 10%;
`;

const TextContent = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  width: 100%;
  &:nth-child(2) {
    padding: 3%;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &:nth-child(3) {
    font-size: 0.8rem;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    font-weight: lighter;
  }
`;
