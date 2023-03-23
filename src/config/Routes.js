import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Blocks } from "react-loader-spinner";
import { BrowserRouter as Router, Route, Routes as RoutesGroup } from "react-router-dom";
import styled from "styled-components";
import SidebarDB from "../components/SidebarDB";
import CreateDatabase from "../pages/CreateDatabase";
import ReadTable from "../pages/ReadTable";
import DatabaseService from "../services/DatabaseService";

const Routes = () => {
    const [loading, setLoading] = useState(true);
    const [databases, setDatabases] = useState([]);
    const [selectedDb, setSelectedDb] = useState("");
    const [selectedTable, setSelectedTable] = useState("");

    useEffect(() => {
        DatabaseService.getStructure(setDatabases);
    }, []);

    useEffect(() => {
        if (databases.length > 0) {
            setSelectedDb(databases[0].name);
            setSelectedTable(databases[0].tables[0].name);
        }
        setLoading(false);
    }, [databases]);

    if (loading) {
        return (
            <View className="App">
                <Blocks visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" />
            </View>
        );
    }
    return (
        <View className="App">
            <Toaster position="top-right" reverseOrder={true} />
            <Router>
                <SidebarDB
                    databases={databases}
                    setSelectedDb={setSelectedDb}
                    setSelectedTable={setSelectedTable}
                    setDatabases={setDatabases}
                />
                <MainArea>
                    <Title>{selectedDb === "" ? "Select a database" : selectedDb + "/" + selectedTable}</Title>
                    <div></div>
                    <RoutesGroup>
                        <Route exact path="/" element={<ReadTable />}></Route>
                        <Route exact path="createDatabase" element={<CreateDatabase />} />
                    </RoutesGroup>
                </MainArea>
            </Router>
        </View>
    );
};

const View = styled.div`
    display: flex;
    height: 100vh;
    background-color: #292d3e;
    color: #000;
`;

const MainArea = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Title = styled.div`
    display: flex;
    flex-direction: row;
    height: 4%;
    align-items: center;
    justify-content: center;
    background-color: #1c1f2b;
    color: #fff;
`;

export default Routes;
