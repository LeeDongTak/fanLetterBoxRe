import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StWrap, StContainer } from "../styed/commonStyle";
import ArtistBtn from "../components/home/ArtistBtn";
import FanLetterInsertBox from "../components/home/FanLetterInsertBox";
import FanLetterListBox from "../components/home/FanLetterListBox";
import SeatchWrap from "../components/home/SeatchWrap";
import { useDispatch, useSelector } from "react-redux";
import { urlParamsArtist, __getFanLetter } from "../redux/modules/fanLetter";
import { __getUser } from "../redux/modules/auth";

function Home() {
  const artistBtn = useSelector((state) => state.artistBtn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();


  // component mount시 true인 맴버담기
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

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/login");
    } else {
      dispatch(__getFanLetter());
    }
  }, []);

  return (
    <StWrap>
      <StContainer>
        {/* 맴버선텍영역 */}
        <ArtistBtn />
        <ContentWrap>
          {/* 펜레터 추가 영역 */}
          <FanLetterInsertBox />
          <SeatchAndListWrap>
            {/* Seatch영역 */}
            <SeatchWrap />
            {/* list영역 */}
            <FanLetterListBox />
          </SeatchAndListWrap>
        </ContentWrap>
      </StContainer>
    </StWrap>
  );
}

export default Home;

const ContentWrap = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
`;

const SeatchAndListWrap = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
