import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../components/login/Modal";
import SignIn from "../components/login/SignIn";
import Signup from "../components/login/Signup";
import { useSelector } from "react-redux";

function Login() {
  const auth = useSelector((state) => state.auth);
  const [signUpToggle, setSignUpToggle] = useState(false);
  return (
    <StLoginWrap>
      {auth.isError === true ||
      auth.signUpsuccess === true ||
      auth.signInsuccess === true ? (
        <Modal setSignUpToggle={setSignUpToggle} />
      ) : null}
      <StLoginContainer>
        {signUpToggle === false ? (
          <SignIn setSignUpToggle={setSignUpToggle} />
        ) : (
          <Signup setSignUpToggle={setSignUpToggle} />
        )}
      </StLoginContainer>
    </StLoginWrap>
  );
}

export default Login;

export const StLoginWrap = styled.div`
  width: 100%;
  height: 100vh;
`;
export const StLoginContainer = styled.div`
  width: 40%;
  height: 80%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  box-shadow: 0 0 5px 2px #fff;
  border-radius: 5px;
`;
