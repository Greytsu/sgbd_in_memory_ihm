import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const Filters = (props) => {
    return (
        <Container>
            {props.filters.map((filter) => (
                <Button variant="info" key={filter.column} onClick={() => props.removeFilter(filter.column)}>
                    {filter.column + filter.operator + filter.value}
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

export default Filters;
