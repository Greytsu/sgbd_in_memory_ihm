import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import styled from "styled-components";

const AddFilters = (props) => {
    const operators = ["=", ">=", "<=", ">", "<", "!="];
    const [selectedColumn, setSelectedColumn] = useState();
    const [selectedOperator, setSelectedOperator] = useState();
    const [filterValue, setFilterValue] = useState("");

    useEffect(() => {
        if (props.columns[0]) {
            setSelectedColumn(props.columns[0].name);
            setSelectedOperator(operators[0]);
        }
    }, [props.columns]);

    if (props.columns === []) return;

    const conditionalInput = () => {
        if (!props.columns.filter((column) => column.name === selectedColumn)[0]) return;
        const type = props.columns.filter((column) => column.name === selectedColumn)[0].type;
        if (type === "number") {
            return (
                <InputGroup size="sm" className="mb-3">
                    <Form.Control
                        aria-describedby="inputGroup-sizing-sm"
                        type="number"
                        onChange={(event) => setFilterValue(event.target.value)}
                    />
                </InputGroup>
            );
        } else if (type === "string") {
            return (
                <InputGroup size="sm" className="mb-3">
                    <Form.Control aria-describedby="inputGroup-sizing-sm" onChange={(event) => setFilterValue(event.target.value)} />
                </InputGroup>
            );
        } else {
            return (
                <Form.Select className="mb-3" onChange={(event) => setFilterValue(event.target.value === "true")}>
                    <option>false</option>
                    <option>true</option>
                </Form.Select>
            );
        }
    };

    return (
        <Container>
            <Form.Select className="mb-3" aria-label="Default select example" onChange={(event) => setSelectedColumn(event.target.value)}>
                {props.columns.map((column) => {
                    return (
                        <option value={column.name} key={column.name}>
                            {column.name}
                        </option>
                    );
                })}
            </Form.Select>
            <Form.Select className="mb-3" aria-label="Default select example" onChange={(event) => setSelectedOperator(event.target.value)}>
                {operators.map((operator) => {
                    return (
                        <option value={operator} key={operator}>
                            {operator}
                        </option>
                    );
                })}
            </Form.Select>
            {conditionalInput()}
            <Button
                className="mb-3"
                variant="primary"
                onClick={() => props.addFilter({ column: selectedColumn, operator: selectedOperator, value: filterValue })}
            >
                add
            </Button>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 10px 10px 0px 10px;
    gap: 10px;
`;

export default AddFilters;
