import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { urlParamsArtist } from "../../redux/modules/fanLetter";
import { memberCoice } from "../../redux/modules/artistBtn";
import styled from "styled-components";
import FanLetterListBox from "./FanLetterListBox";

function ProfileMyLettersBox() {
  const artistBtn = useSelector((state) => state.artistBtn);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const memberTrue = artistBtn.artistMember.filter(
      (item) => item.status === true
    );
    searchParams === null
      ? navigate(`/?artistSort=사쿠라`)
      : searchParams.set("artistSort", `${memberTrue[0].artistName}`);
    setSearchParams(searchParams);
    dispatch(urlParamsArtist(searchParams.get("artistSort")));
  }, [artistBtn.artistMember]);

  return (
    <StProfileBox>
      <StArtistBox>
        {artistBtn.artistMember.map((x) => {
          return (
            <StArtistItem
              onClick={() => {
                dispatch(memberCoice(x.id));
              }}
              $btnClick={x.status}
              key={x.id}
            >
              {x.artistName}
            </StArtistItem>
          );
        })}
      </StArtistBox>
      <FanLetterListBox></FanLetterListBox>
    </StProfileBox>
  );
}

export default ProfileMyLettersBox;

const StProfileBox = styled.div`
  width: 50%;
  height: 100%;
`;

const StArtistBox = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
`;

const StArtistItem = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  text-shadow: 0 0 5px #fff;
  color: ${({ $btnClick }) => ($btnClick ? "#f00" : "#fff")};
  cursor: pointer;
  &:hover {
    color: #f00;
  }
`;
