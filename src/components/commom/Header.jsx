import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import { __getUser } from "../../redux/modules/auth";
import { useDispatch } from "react-redux";
import LogOutModal from "./LogOutModal";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logOutModal, setLogOutModal] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (localStorage.getItem("user") !== null) {
      dispatch(__getUser({ navigate, accessToken: user?.accessToken }));
    }
    const interval = setInterval(() => {
      if (localStorage.getItem("user") !== null) {
        dispatch(__getUser({ navigate, accessToken: user?.accessToken }));
      }
    }, 600000);
    setInterval(() => {
      if (localStorage.getItem("user") === null) {
        clearInterval(interval);
      }
    }, 6000);
  }, []);
  return (
    <>
      <StWraper>
        {logOutModal === true ? (
          <LogOutModal setLogOutModal={setLogOutModal} />
        ) : null}
        <StButton
          onClick={() => {
            navigate("/");
          }}
          $text="home"
        >
          Home
        </StButton>
        <StRightBox>
          <StButton
            onClick={() => {
              navigate("/profile");
            }}
          >
            내 프로필
          </StButton>
          <StButton
            onClick={() => {
              setLogOutModal(true);
            }}
          >
            로그아웃
          </StButton>
        </StRightBox>
      </StWraper>
      <Outlet></Outlet>
    </>
  );
}

export default Header;

const StWraper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 103;
  width: 100%;
  height: 8%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StRightBox = styled.div`
  width: 15%;
  height: auto;
  display: flex;
  justify-content: flex-start;
`;
const StButton = styled.div`
  flex: 1;
  color: #fff;
  font-size: 1.5rem;
  text-shadow: 0 0 5px #fff;
  margin-right: 2%;
  margin-left: ${({ $text }) => ($text === "home" ? "2%" : "0")};
  cursor: pointer;
  &:hover {
    color: #f00;
  }
`;
