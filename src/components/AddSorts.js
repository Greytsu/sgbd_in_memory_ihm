import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styled from "styled-components";

const AddSorts = (props) => {
    const [selectedColumn, setSelectedColumn] = useState();
    const [sortValue, setSortValue] = useState("asc");

    useEffect(() => {
        if (props.columns === []) return;
        setSelectedColumn(props.columns[0].name);
    }, []);

    if (props.columns === []) return;

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
            <Form.Select className="mb-3" aria-label="Default select example" onChange={(event) => setSortValue(event.target.value)}>
                <option>asc</option>
                <option>desc</option>
            </Form.Select>
            <Button className="mb-3" variant="primary" onClick={() => props.addSort({ column: selectedColumn, value: sortValue })}>
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

export default AddSorts;
