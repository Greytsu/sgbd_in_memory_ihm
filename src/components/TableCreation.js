import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styled from "styled-components";
import ColumnCreation from "./ColumnCreation";

const TableCreation = (props) => {
    const [tableName, setTableName] = useState(props.table.name);
    const [columns, setColumns] = useState(props.table.columns);

    const changeColumns = (id, name, type, isIndex) => {
        setColumns(columns.map((item) => (item.id === id ? { ...item, name: name, type: type, isIndex: isIndex } : item)));
    };

    const addColumn = () => {
        setColumns([
            ...columns,
            {
                id: columns[columns.length - 1].id + 1,
                name: "",
                type: "Type",
                isIndex: false,
                responseCode: 0,
            },
        ]);
    };

    useEffect(() => {
        props.setTables(props.tables.map((table) => (table.id === props.id ? { ...table, name: tableName, columns: columns } : table)));
    }, [tableName, columns]);

    return (
        <View>
            <Area>
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
                    return <ColumnCreation key={column.id} column={column} changeColumns={changeColumns} />;
                })}
                <Button variant="secondary" size="sm" onClick={() => addColumn()}>
                    Add Column
                </Button>
            </Area>
        </View>
    );
};

const View = styled.div`
    background-color: #424864;
    border-radius: 5px;
`;

const Area = styled.div`
    padding: 10px;
`;

export default TableCreation;
