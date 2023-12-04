import React from "react";
import styled from "styled-components";
import Button from "../commom/Button";
import { useSelector } from "react-redux";

function DetailBtnBox() {
  const fanLetter = useSelector((state) => state.fanLetter);
  const modal = useSelector((state) => state.modal);
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <BtnBox>
      {fanLetter.detailData.userId === user?.userId ? (
        modal.updContentShow === false ? (
          <>
            <Button Sortation="수정" />
            <Button Sortation="삭제" />
          </>
        ) : (
          <>
            <Button Sortation="수정완료" />
            <Button Sortation="수정취소" />
          </>
        )
      ) : null}
    </BtnBox>
  );
}

export default DetailBtnBox;

// 수정, 삭제 버튼 영역
const BtnBox = styled.div`
  width: 80%;
  flex: 1.5;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
