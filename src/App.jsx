import React, { useEffect } from "react";
import Router from "./pages/Router";
import styled from "styled-components";
import GlobalStyle from "./styed/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
