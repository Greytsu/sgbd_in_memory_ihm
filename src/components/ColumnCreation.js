import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styled from "styled-components";

const ColumnCreation = (props) => {
    return (
        <>
            <InputGroup className="mb-3" key={props.column.id}>
                <DropdownButton variant="info" title={props.column.type} id="input-group-dropdown-1">
                    <Dropdown.Item
                        href="#"
                        onClick={() => props.changeColumns(props.column.id, props.column.name, "string", props.column.isIndex)}
                    >
                        string
                    </Dropdown.Item>
                    <Dropdown.Item
                        href="#"
                        onClick={() => props.changeColumns(props.column.id, props.column.name, "number", props.column.isIndex)}
                    >
                        number
                    </Dropdown.Item>
                    <Dropdown.Item
                        href="#"
                        onClick={() => props.changeColumns(props.column.id, props.column.name, "boolean", props.column.isIndex)}
                    >
                        boolean
                    </Dropdown.Item>
                </DropdownButton>
                <InputGroup.Checkbox
                    aria-label="Checkbox for following text input"
                    checked={props.column.isIndex}
                    onChange={(event) => {
                        console.log(event.target.checked);
                        props.changeColumns(props.column.id, props.column.name, props.column.type, event.target.checked);
                    }}
                />
                <Form.Control
                    aria-label="Text input with dropdown button"
                    value={props.column.name}
                    onChange={(event) => {
                        props.changeColumns(props.column.id, event.target.value, props.column.type, props.column.isIndex);
                    }}
                />
            </InputGroup>
        </>
    );
};
export default ColumnCreation;
