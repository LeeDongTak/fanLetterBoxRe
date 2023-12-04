import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  __getUser,
  __updateUser,
  userImgURLChange,
} from "../../redux/modules/auth";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProfileUpdateBox() {
  const auth = useSelector((state) => state.auth);
  const fanLetter = useSelector((state) => state.fanLetter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nicknameRef = useRef(null);
  const imgRef = useRef(null);
  const [updFocus, setUpdFocus] = useState(false);
  const [imgFile, setImgFile] = useState("");
  const [nickNameInput, setNickNameInput] = useState("");
  const [user, setUser] = useState("");
  const myLettersData = fanLetter.fanLetterData.filter(
    (item) => item.userId === auth.user.id
  );

  const nickNameChangeHandler = (e) => {
    setNickNameInput(e.target.value);
  };
  const imgRefClick = () => {
    imgRef?.current?.click();
  };
  const profileImgHandler = (e) => {
    setImgFile(e.target.files[0]);
    let reader = new FileReader();
    reader.onload = (data) => {
      dispatch(userImgURLChange(data.target.result));
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  useEffect(() => {
    nicknameRef?.current?.focus();
  }, [updFocus]);
  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      const LSuser = JSON.parse(localStorage.getItem("user"));
      dispatch(__getUser({ navigate, accessToken: LSuser.accessToken }));
      setNickNameInput(LSuser.nickname);
      setUser(LSuser);
      
    }
  }, []);
  return (
    <StProfileBox>
      <StProfileImgBox>
        <StProfileImg $img={auth.user.avatar}></StProfileImg>
        <StImgFile type="file" onChange={profileImgHandler} ref={imgRef} />
        {updFocus === true ? (
          <StProfileImgButton onClick={imgRefClick}>
            <FontAwesomeIcon icon={faPlus} />
          </StProfileImgButton>
        ) : null}
      </StProfileImgBox>
      <StProfileTextBox>
        <StSpan $span="title">아이디</StSpan>
        <StSpan $span=":">:</StSpan>
        <StSpan $span="info">{auth.user.id}</StSpan>
      </StProfileTextBox>
      <StProfileTextBox>
        <StSpan $span="title">닉네임</StSpan>
        <StSpan $span=":">:</StSpan>
        {updFocus === true ? (
          <StInput
            type="text"
            value={nickNameInput}
            onChange={nickNameChangeHandler}
            ref={nicknameRef}
          />
        ) : (
          <StSpan $span="info">{auth.user.nickname}</StSpan>
        )}
      </StProfileTextBox>
      <StProfileButtonBox>
        {updFocus === true ? (
          <>
            <StButton
              onClick={() => {
                dispatch(
                  __updateUser({
                    setUpdFocus,
                    accessToken: user.accessToken,
                    imgFile,
                    nickNameInput,
                    id: auth.user.id,
                    myLettersData,
                  })
                );
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  dispatch(
                    __updateUser({
                      setUpdFocus,
                      accessToken: user.accessToken,
                      imgFile,
                      nickNameInput,
                      id: auth.user.id,
                      myLettersData,
                    })
                  );
                }
              }}
            >
              수정완료
            </StButton>
            <StButton
              onClick={() => {
                setUpdFocus(false);
              }}
            >
              취소
            </StButton>
          </>
        ) : (
          <StButton
            onClick={() => {
              setUpdFocus(true);
            }}
          >
            수정하기
          </StButton>
        )}
      </StProfileButtonBox>
      <div></div>
      <div></div>
    </StProfileBox>
  );
}

export default ProfileUpdateBox;

const StProfileBox = styled.div`
  width: 50%;
  height: 100%;
  background-color: ${({ $text }) => ($text === "list" ? `#f00` : `none`)};
`;

// 프로필을 보여주는 영역
const StProfileImgBox = styled.div`
  position: relative;
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StProfileImg = styled.div`
  width: 33%;
  height: 80%;
  border-radius: 50%;
  background-image: url(${({ $img }) =>
    $img === null
      ? "https://www.youthblg.org/common/img/default_profile.png"
      : $img});
  background-size: cover;
  background-position: center;
`;

const StImgFile = styled.input`
  display: none;
`;
const StProfileImgButton = styled.div`
  position: absolute;
  bottom: 8%;
  right: 32%;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #000;
  box-shadow: 0 0 5px 2px #fff;
  text-shadow: 0 0 10px #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.35rem;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

const StProfileTextBox = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 0 0 5px #fff;
`;
const StSpan = styled.div`
  width: ${({ $span }) =>
    $span === "title" ? "30%" : $span === ":" ? "10%" : "40%"};
  height: 100%;
  display: flex;
  justify-content: ${({ $span }) =>
    $span === "info" ? "flex-start" : "center"};
  align-items: center;
`;
const StInput = styled.input`
  width: 32%;
  margin-right: 9%;
  font-size: 1.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 0 0 5px 2px #fff;
  background-color: rgba(255, 255, 255, 0.8);
  border: 0;
  transition: 0.2s;
  &:focus {
    outline: none;
    background-color: rgba(255, 255, 255, 1);
  }
`;

const StProfileButtonBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 0 0 5px #fff;
`;
const StButton = styled.button`
  width: 65%;
  margin-top: 5%;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 1.5rem;
  padding: 3% 0;
  border: 0;
  border-radius: 5px;
  box-shadow: 0 0 5px 2px #fff;
  font-weight: bold;
  transition: 0.1s;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #000;
  }
`;
