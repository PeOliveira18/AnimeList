import React from "react"
import Home from "./Pages/home"
import styled from "styled-components"

const AppContainer = styled.div`
  margin: 0;
  padding: 0;
  max-width: 100%;
`

function App() {
  return (
    <AppContainer>
      <Home/>
    </AppContainer>
  )
}

export default App
