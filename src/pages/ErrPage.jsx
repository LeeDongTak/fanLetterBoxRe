import React from "react";
import { StContainer, StWrap } from "../styed/commonStyle";
import styled from "styled-components";
import Button from "../components/commom/Button";

function ErrPage() {
  return (
    <StWrap>
      <StContainer>
        <Button Sortation="홈" />
        <TextBox>
          <Text $text="404">404</Text>
          <Text>존재하는 페이지가 아닙니다. </Text>
        </TextBox>
      </StContainer>
    </StWrap>
  );
}

export default ErrPage;

const TextBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-shadow: 0 0 10px #fff;
  font-weight: bold;
`;
const Text = styled.div`
  font-size:${({ $text }) => ($text === "404" ? "9rem" : "3rem")};
  text-align: center;
  margin-bottom: 5%;
`;
