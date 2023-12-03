import React from "react";
import { StContainer, StWrap } from "../styed/commonStyle";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Modal from "../components/profile/Modal";
import ProfileUpdateBox from "../components/profile/ProfileUpdateBox";
import ProfileMyLettersBox from "../components/profile/ProfileMyLettersBox";

function Profile() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();


 
  return (
    <StWrap>
      {auth.isError || auth.isSuccess === true ? <Modal /> : null}
      <StContainer>
        <StProfileTitle>내 프로필</StProfileTitle>
        <StProfileSection>
          <ProfileUpdateBox></ProfileUpdateBox>
          <ProfileMyLettersBox></ProfileMyLettersBox>
        </StProfileSection>
      </StContainer>
    </StWrap>
  );
}

export default Profile;

const StProfileTitle = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  text-shadow: 0 0 5px #fff;
`;

const StProfileSection = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

