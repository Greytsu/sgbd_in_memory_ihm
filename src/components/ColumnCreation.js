import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const ColumnCreation = (props) => {
    return (
        <>
            <InputGroup className="mb-3" key={props.column.id}>
                <DropdownButton variant="info" title={props.column.type} id="input-group-dropdown-1">
                    <Dropdown.Item
                        href="#"
                        onClick={() => props.changeColumns(props.column.id, props.column.name, "string", props.column.index)}
                    >
                        string
                    </Dropdown.Item>
                    <Dropdown.Item
                        href="#"
                        onClick={() => props.changeColumns(props.column.id, props.column.name, "int", props.column.index)}
                    >
                        int
                    </Dropdown.Item>
                    <Dropdown.Item
                        href="#"
                        onClick={() => props.changeColumns(props.column.id, props.column.name, "boolean", props.column.index)}
                    >
                        boolean
                    </Dropdown.Item>
                </DropdownButton>
                <Form.Control
                    aria-label="Text input with dropdown button"
                    value={props.column.name}
                    onChange={(event) => {
                        props.changeColumns(props.column.id, event.target.value, props.column.type, props.column.index);
                    }}
                />
            </InputGroup>
        </>
    );
};

export default ColumnCreation;
