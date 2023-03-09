import "./App.css";
import styled from "styled-components";
import SidebarDB from "./components/SidebarDB";
import { useEffect } from "react";
import env from "react-dotenv";

const App = () => {
    useEffect(() => {
        console.log(env.API_URL);
    }, []);

    return (
        <View className="App">
            <SidebarDB />
        </View>
    );
};

const View = styled.div`
    display: flex;
    height: 100vh;
    background-color: #292d3e;
    color: #000;
`;

export default App;
