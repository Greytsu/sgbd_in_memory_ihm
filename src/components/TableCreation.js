import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { toast } from "react-hot-toast";
import styled from "styled-components";
import ColumnCreation from "./ColumnCreation";

const TableCreation = (props) => {
    const [tableName, setTableName] = useState("");
    const [columns, setColumns] = useState([{ id: 1, name: "", type: "Type", index: false }]);

    const changeColumns = (id, name, type, index) => {
        console.log(id, name, type, index);
        setColumns(columns.map((item) => (item.id === id ? { ...item, name: name, type: type, index: index } : item)));
    };

    const addColumn = () => {
        if (columns[columns.length - 1].name === "") {
        }
        setColumns([...columns, { id: columns[columns.length - 1].id + 1, name: "", type: "Type", index: false }]);
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
                    return <ColumnCreation column={column} changeColumns={changeColumns} />;
                })}

                <button onClick={() => addColumn()}>Add column</button>
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
