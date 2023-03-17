import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styled from "styled-components";
import TableCreation from "../components/TableCreation";

const CreateDatabase = () => {
    const [dbName, setDbName] = useState("");
    const [tables, setTables] = useState([]);
    return (
        <>
            <View>
                <Area>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm">Database name</InputGroup.Text>
                        <Form.Control
                            aria-label="Database name"
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={(event) => setDbName(event.target.value)}
                            value={dbName}
                        />
                    </InputGroup>
                </Area>
                //TODO: use a scrollview
                <TableCreation />
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
`;

export default CreateDatabase;
