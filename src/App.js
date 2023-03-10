import "./App.css";
import styled from "styled-components";
import SidebarDB from "./components/SidebarDB";
import { useEffect, useState } from "react";
import env from "react-dotenv";
import axios from "axios";
import { Blocks } from "react-loader-spinner";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const [loading, setLoading] = useState(true);
    const [databases, setDatabases] = useState([]);
    const [selectedDb, setSelectedDb] = useState("");
    const [selectedTable, setSelectedTable] = useState("");

    useEffect(() => {
        console.log(env.API_URL + "/databases");
        axios
            .get(env.API_URL + "/databases")
            .then((response) => {
                setDatabases(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        console.log(databases);
        if (databases.length > 0) {
            setSelectedDb(databases[0].name);
            setSelectedTable(databases[0].tables[0].name);
        }
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
            <SidebarDB databases={databases} setSelectedDb={setSelectedDb} setSelectedTable={setSelectedTable} />
            <MainArea>
                <Title>{selectedDb === "" ? "Select a database" : selectedDb + "/" + selectedTable}</Title>

                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan={2}>Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
            </MainArea>
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

export default App;
