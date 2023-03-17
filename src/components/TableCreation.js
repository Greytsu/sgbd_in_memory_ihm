import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styled from "styled-components";
import ColumnCreation from "./ColumnCreation";

const TableCreation = () => {
    const [tableName, setTableName] = useState("");
    const [columns, setColumns] = useState([{ id: 1, name: "", type: "Type", index: false }]);

    const changeColumns = (id, name, type, index) => {
        console.log(id, name, type, index);
        setColumns(columns.map((item) => (item.id === id ? { ...item, name: name, type: type, index: index } : item)));
    };

    const addColumn = () => {
        setColumns([...columns, { id: columns[columns.length - 1].id + 1, name: "", type: "Type", index: false }]);
    };
    useEffect(() => {
        console.log(columns);
    }, [columns]);

    return (
        <View>
            <Area>
                <Title>Create table</Title>
                <button onClick={() => addColumn()}>Add</button>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Table name</InputGroup.Text>
                    <Form.Control
                        aria-label="Table name"
                        aria-describedby="inputGroup-sizing-sm"
                        onChange={(event) => setTableName(event.target.value)}
                        value={tableName}
                    />
                </InputGroup>

                {columns.map((column) => {
                    return <ColumnCreation column={column} changeColumns={changeColumns} />;
                })}
            </Area>
        </View>
    );
};

const Title = styled.h5`
    background-color: #424864;
    border-radius: 5px;
`;

const View = styled.div`
    background-color: #424864;
    border-radius: 5px;
`;

const Area = styled.div`
    padding: 10px;
`;

export default TableCreation;
