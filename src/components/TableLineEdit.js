import React, { useState } from "react";
import { GiCancel } from "react-icons/gi";
import { MdOutlineDownloadDone } from "react-icons/md";
import DatabaseService from "../services/DatabaseService";
import AddLineInput from "./AddLineInput";

const TableLineEdit = (props) => {
    const [data, setData] = useState(props.data);

    const handleChange = (column, value) => {
        setData({ ...data, [column]: value });
    };

    const handleSave = () => {
        DatabaseService.putData(props.selectedDb, props.selectedTable, data, props.datas, props.setDatas);
        props.setEditingLine(0);
    };

    return (
        <>
            <tr key={props.data.id}>
                <td>{props.data.id}</td>
                {props.columns.map((column) => {
                    return <AddLineInput column={column} handleChange={handleChange} key={column.name} />;
                })}
                <td>
                    <MdOutlineDownloadDone onClick={() => handleSave()} />
                    <GiCancel onClick={() => props.setEditingLine(0)} />
                </td>
            </tr>
        </>
    );
};

export default TableLineEdit;
