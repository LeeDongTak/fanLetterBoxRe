import React, { useContext, useState } from "react";
import styled from "styled-components";
import Button from "../commom/Button";
import { searchChage } from "../../redux/modules/homeRedux/searchFanLetter";
import { useDispatch, useSelector } from "react-redux";
import { searchCommit } from "../../redux/modules/homeRedux/searchFanLetter";
import { insertMsgCheck } from "../../redux/modules/homeRedux/insertFanLetter";
import { useNavigate } from "react-router-dom";

function SeatchWrap() {
  const insertFanLetter = useSelector((state) => state.insertFanLetter);
  const searchFanLetter = useSelector((state) => state.searchFanLetter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchinputChage = (e) => {
    dispatch(searchChage(e.target.value));
  };

  return (
    <SearchBox>
      <SearchName>{insertFanLetter.searchParamsArtist}</SearchName>
      <SeatchInput
        placeholder="펜레터를 검색하세요"
        value={searchFanLetter.SeatchInput}
        type="text"
        onChange={searchinputChage}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            dispatch(searchCommit());
            dispatch(insertMsgCheck());
          }
        }}
      />
      <Button Sortation="검색초기화" />
    </SearchBox>
  );
}

export default SeatchWrap;

const SearchBox = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchName = styled.div`
  width: 15%;
  height: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: bold;
  font-size: 1.4rem;
  text-shadow: 0 0 5px #fff;
`;

const SeatchInput = styled.input`
  width: 59%;
  height: 49%;
  border-radius: 5px;
  box-shadow: 0 0 5px 2px #fff;
  background-color: rgba(255, 255, 255, 0.8);
  border: 0;
  font-size: 1.3rem;
  &:focus {
    outline: none;
    border: 1px solid #fff;
  }
`;
