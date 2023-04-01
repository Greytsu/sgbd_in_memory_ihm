import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { GiCancel } from "react-icons/gi";
import { GrAdd } from "react-icons/gr";

const TableLineEdit = (props) => {
    const [data, setData] = useState(props.data);

    const handleChange = (column, value) => {
        setData({ ...data, [column]: value });
    };

    const handleSave = () => {};

    return (
        <>
            <tr key={props.data.id}>
                <td>{props.data.id}</td>
                {props.columns.map((column) => {
                    return (
                        <td key={column.name}>
                            <InputGroup size="sm" className="mb-3">
                                <Form.Control
                                    aria-describedby="inputGroup-sizing-sm"
                                    value={data[column.name]}
                                    onChange={(event) => handleChange(column.name, event.target.value)}
                                />
                            </InputGroup>
                        </td>
                    );
                })}
                <td>
                    <GrAdd />
                    <GiCancel />
                </td>
            </tr>
        </>
    );
};

export default TableLineEdit;
