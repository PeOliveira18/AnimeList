import React from "react"
import Home from "./Pages/home"
import styled from "styled-components"

export const AppContainer = styled.div`
  margin: 0;
  padding: 0;
  min-height: 100vh;
  width: 100%;
  background-color: #F5F5F5;
`;


function App() {
  return (
      <Home/>
  )
}

export default App
