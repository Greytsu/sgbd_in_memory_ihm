import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styled from "styled-components";
import TableCreation from "../components/TableCreation";
import DatabaseService from "../services/DatabaseService";

const CreateDatabase = (props) => {
    const [dbName, setDbName] = useState("test");
    const [savedDb, setSavedDb] = useState(0);
    const [tables, setTables] = useState([
        {
            id: 1,
            name: "table1",
            columns: [{ id: 1, name: "column1", type: "string", isIndex: false, responseCode: 0 }],
            responseCode: 0,
        },
        {
            id: 2,
            name: "table2",
            columns: [{ id: 1, name: "column1", type: "string", isIndex: false, responseCode: 0 }],
            responseCode: 0,
        },
    ]);

    let responseCodes = [];

    const addTable = () => {
        setTables([
            ...tables,
            {
                id: tables[tables.length - 1].id + 1,
                name: "",
                columns: [
                    {
                        id: 1,
                        name: "",
                        type: "Type",
                        responseCode: 0,
                    },
                ],
                responseCode: 0,
            },
        ]);
    };

    //save db
    const handleSave = () => {
        DatabaseService.postDatabase(dbName, setSavedDb);
    };

    //save tables
    useEffect(() => {
        if (savedDb === 201) {
            tables.forEach((table) => {
                DatabaseService.postTable(dbName, table, responseCodes);
            });
        }
    }, [savedDb]);

    //save columns
    useEffect(() => {
        setTimeout(() => {
            if (responseCodes.length === tables.length && responseCodes.filter((responseCode) => responseCode.responseCode === 201)) {
                DatabaseService.getStructure(props.setDatabases);
                tables.forEach((table) => {
                    table.columns.forEach((column) => {
                        DatabaseService.postColumn(dbName, table.name, column);
                    });
                });
            }
        }, 500);
    }, [responseCodes]);

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
                    <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => {
                            addTable();
                        }}
                    >
                        Add table
                    </Button>
                    <Button
                        variant="success"
                        size="lg"
                        onClick={() => {
                            handleSave();
                        }}
                    >
                        Save
                    </Button>
                </Area>
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
