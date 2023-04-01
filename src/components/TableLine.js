import React from "react";
import { RiEditFill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import DatabaseService from "../services/DatabaseService";

const TableLine = (props) => {
    return (
        <>
            <tr key={props.data.id}>
                <td>{props.data.id}</td>
                {props.columns.map((column) => {
                    return column.type === "boolean" ? (
                        <td key={column.name}>{props.data[column.name] === true ? "true" : "false"}</td>
                    ) : (
                        <td key={column.name}>{props.data[column.name]}</td>
                    );
                })}
                <td>
                    <RiEditFill
                        size="1em"
                        onClick={() => {
                            props.setEditingLine(props.data.id);
                        }}
                    />
                    <AiFillDelete
                        size="1em"
                        onClick={() =>
                            DatabaseService.deleteData(props.selectedDb, props.selectedTable, props.data.id, props.datas, props.setDatas)
                        }
                    />
                </td>
            </tr>
        </>
    );
};

export default TableLine;
