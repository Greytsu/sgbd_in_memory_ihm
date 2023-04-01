import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { GrAdd } from "react-icons/gr";
import styled from "styled-components";
import DatabaseService from "../services/DatabaseService";
import AddLineInput from "./AddLineInput";

const AddLine = (props) => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const handleChange = (column, value) => {
        setData({ ...data, [column]: value });
    };

    const handleSave = () => {
        console.log(data);
        DatabaseService.postData(props.selectedDb, props.selectedTable, data, props.tableDatas, props.setTableDatas);
    };

    return (
        <tr>
            <td>New line</td>
            {props.columns.map((column) => {
                return (
                    <AddLineInput column={column} handleChange={handleChange} key={column.name} />
                    // <td key={column.name}>
                    //     <InputGroup size="sm" className="mb-3">
                    //         <Form.Control
                    //             aria-describedby="inputGroup-sizing-sm"
                    //             onChange={(event) => handleChange(column.name, event.target.value)}
                    //             placeholder={column.name}
                    //         />
                    //     </InputGroup>
                    // </td>
                );
            })}
            <td>
                <Btn onClick={() => handleSave()}>
                    <GrAdd size="1em" />
                </Btn>
            </td>
        </tr>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    gap: 10px;
    padding: 10px;
`;

const Btn = styled.button`
    border: 0;
    border-radius: 25px;
`;

export default AddLine;
