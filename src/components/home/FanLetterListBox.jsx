import React, { useContext, useState } from "react";
import styled from "styled-components";
import FanLetter from "./FanLetter";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function FanLetterListBox() {
  const fanLetter = useSelector((state) => state.fanLetter);
  const searchFanLetter = useSelector((state) => state.searchFanLetter);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsartistSort = searchParams.get("artistSort")
  const fanLetterMsg = fanLetter.fanLetterData.filter(
    (item) => item.writedTo === searchParamsartistSort
  );
  return (
    <ListBox>
      {fanLetter.fanLetterData
        .filter((item) => item.writedTo === searchParamsartistSort)
        .filter((item) =>
          searchFanLetter.searchInput !== null
            ? item.nickname.includes(searchFanLetter.searchInput) ||
              item.content.includes(searchFanLetter.searchInput) ||
              item.createdAt.includes(searchFanLetter.searchInput)
            : item
        )
        .map((item) => (
          <FanLetter key={item.id} fanLetterData={item} />
        ))}

      {fanLetterMsg.length === 0 ? (
        <StMsg>
          {searchParamsartistSort}에게 첫번째 팬레터를 보내주세요
        </StMsg>
      ) : null}
    </ListBox>
  );
}

export default FanLetterListBox;

const ListBox = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StMsg = styled.div`
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  text-shadow: 0 0 5px #fff;
  font-size: 1.2rem;
  text-align: center;
`;
