import Header from "../Components/header";
import React from "react"
import Popular from "./popular";
import { AppContainer } from "../App";

function Home() {
    return (  
        <AppContainer>
            <Header/>
            <Popular/>
        </AppContainer>
    );
}

export default Home;