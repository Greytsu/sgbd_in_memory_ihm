import React from "react";
import { RiEditFill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";

const TableLine = (props) => {
    return (
        <>
            <tr key={props.data.id}>
                <td>{props.data.id}</td>
                {props.columns.map((column) => {
                    return <td key={column.name}>{props.data[column.name]}</td>;
                })}
                <td>
                    <RiEditFill
                        size="1em"
                        onClick={() => {
                            props.setEditingLine(props.data.id);
                        }}
                    />
                    <AiFillDelete size="1em" />
                </td>
            </tr>
        </>
    );
};

export default TableLine;
