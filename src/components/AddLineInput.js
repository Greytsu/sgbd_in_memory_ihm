import React from "react";
import { Form, InputGroup } from "react-bootstrap";

const AddLineInput = (props) => {
    if (props.column.type === "number") {
        return (
            <>
                <td>
                    <InputGroup size="sm" className="mb-3">
                        <Form.Control
                            aria-describedby="inputGroup-sizing-sm"
                            onChange={(event) => props.handleChange(props.column.name, Number(event.target.value))}
                            placeholder={props.column.name}
                            type="number"
                        />
                    </InputGroup>
                </td>
            </>
        );
    }

    if (props.column.type === "boolean") {
        return (
            <>
                <td>
                    <Form.Select onChange={(event) => props.handleChange(props.column.name, event.target.value === "true")}>
                        <option>false</option>
                        <option>true</option>
                    </Form.Select>
                </td>
            </>
        );
    }

    return (
        <>
            <td>
                <InputGroup size="sm" className="mb-3">
                    <Form.Control
                        aria-describedby="inputGroup-sizing-sm"
                        onChange={(event) => props.handleChange(props.column.name, event.target.value)}
                        placeholder={props.column.name}
                    />
                </InputGroup>
            </td>
        </>
    );
};

export default AddLineInput;
