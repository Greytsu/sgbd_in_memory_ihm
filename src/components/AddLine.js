import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import styled from "styled-components";
import DatabaseService from "../services/DatabaseService";
import AddLineInput from "./AddLineInput";

const AddLine = (props) => {
    const [data, setData] = useState({});

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
                return <AddLineInput column={column} handleChange={handleChange} key={column.name} />;
            })}
            <td>
                <MdAdd size="1em" onClick={() => handleSave()} />
            </td>
        </tr>
    );
};

export default AddLine;
