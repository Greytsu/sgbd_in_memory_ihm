import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const Sorts = (props) => {
    return (
        <Container>
            {props.sorts.map((sort) => (
                <Button variant="primary" key={sort.column} onClick={() => props.removeSort(sort.column)}>
                    {sort.column + " " + sort.value}
                </Button>
            ))}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    padding: 0px 10px 10px 10px;
    gap: 10px;
`;
export default Sorts;
