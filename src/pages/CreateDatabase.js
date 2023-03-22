import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Toaster } from "react-hot-toast";
import styled from "styled-components";
import TableCreation from "../components/TableCreation";

const CreateDatabase = () => {
    const [dbName, setDbName] = useState("");
    const [tables, setTables] = useState([
        { id: 1, name: "", columns: [{ id: 1, name: "", type: "Type", index: false }] },
        { id: 2, name: "", columns: [{ id: 1, name: "", type: "Type", index: false }] },
    ]);

    // useEffect(() => {
    //     console.log("tables", tables);
    // }, [tables]);

    return (
        <>
            <View>
                <Area>
                    <InputGroup size="sm" className="mb-3" key={"database"}>
                        <InputGroup.Text id="inputGroup-sizing-sm">Database name</InputGroup.Text>
                        <Form.Control
                            aria-label="Database name"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={(event) => setDbName(event.target.value)}
                            value={dbName}
                        />
                    </InputGroup>
                    {tables.map((table) => {
                        return <TableCreation key={table.id} id={table.id} table={table} tables={tables} setTables={setTables} />;
                    })}
                </Area>
                {/* TODO: use a scrollview */}
            </View>
        </>
    );
};

const View = styled.div`
    height: 100%;
    margin: 10px;
`;

const Area = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export default CreateDatabase;
