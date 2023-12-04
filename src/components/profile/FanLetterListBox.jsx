import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import FanLetter from "./FanLetter";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { __getFanLetter } from "../../redux/modules/fanLetter";

function FanLetterListBox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fanLetter = useSelector((state) => state.fanLetter);
  const auth = useSelector((state) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsartistSort = searchParams.get("artistSort");
  const fanLetterMsg = fanLetter.fanLetterData.filter(
    (item) => item.writedTo === searchParamsartistSort
  );

  useEffect(() => {
    dispatch(__getFanLetter());
  }, []);
  return (
    <ListBox>
      {fanLetter.fanLetterData
        .filter((item) => item.userId === auth.user.id)
        .filter((item) => item.writedTo === searchParamsartistSort)
        .map((item) => (
          <FanLetter key={item.id} fanLetterData={item} />
        ))}

      {fanLetterMsg.length === 0 ? (
        <StMsg>{searchParamsartistSort}에게 첫번째 팬레터를 보내주세요</StMsg>
      ) : null}
    </ListBox>
  );
}

export default FanLetterListBox;

const ListBox = styled.ul`
  width: 100%;
  height: 90%;
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
