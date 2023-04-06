import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton, Form, InputGroup, Table } from "react-bootstrap";
import { Blocks } from "react-loader-spinner";
import styled from "styled-components";
import AddFilters from "../components/AddFilters";
import AddLine from "../components/AddLine";
import AddSorts from "../components/AddSorts";
import Filters from "../components/Filters";
import Sorts from "../components/Sorts";
import TableLine from "../components/TableLine";
import TableLineEdit from "../components/TableLineEdit";
import DatabaseService from "../services/DatabaseService";

const ReadTable = (props) => {
    const [columns, setColumns] = useState(null);
    const [datas, setDatas] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [editingLine, setEditingLine] = useState(0);
    const [filters, setFilters] = useState([]);
    const [sorts, setSorts] = useState([]);
    const [addTable, setAddTable] = useState("");
    const [addColumnType, setAddColumnType] = useState("type");
    const [addColumnIsIndex, setAddColumnIsIndex] = useState(false);
    const [addColumnName, setAddColumnName] = useState("");
    const responseCodes = [];

    const addFilter = (filter) => {
        setFilters([...filters, filter]);
    };

    const removeFilter = (filterColumn) => {
        setFilters(filters.filter((filter) => filter.column !== filterColumn));
    };

    const addSort = (sort) => {
        setSorts([...sorts, sort]);
    };

    const removeSort = (sortColumn) => {
        setSorts(sorts.filter((sort) => sort.column !== sortColumn));
    };

    const handleDeleteDb = () => {
        DatabaseService.deleteDatabase(props.selectedDb);
        setTimeout(() => {
            DatabaseService.getStructure(props.setDatabases);
        }, 500);
    };

    const handleDeleteTable = () => {
        DatabaseService.deleteTable(props.selectedDb, props.selectedTable);
        setTimeout(() => {
            DatabaseService.getStructure(props.setDatabases);
        }, 500);
    };

    useEffect(() => {
        if (props.selectedDb && props.selectedTable) {
            DatabaseService.getColumns(props.selectedDb, props.selectedTable, setColumns);
        }
    }, [props]);

    useEffect(() => {
        if (columns != null) {
            DatabaseService.getDatas(
                props.selectedDb,
                props.selectedTable,
                setDatas,
                filters.map((filter) => filter.column + filter.operator + filter.value).join(),
                sorts.map((sort) => (sort.value === "desc" ? "!" : "" + sort.column)).join()
            );
        }
    }, [columns, filters, sorts]);

    useEffect(() => {
        if (datas != null) {
            setIsLoading(false);
        }
    }, [datas]);

    useEffect(() => {
        setFilters([]);
        setSorts([]);
    }, [props.selectedDb, props.selectedTable]);

    if (isLoading) {
        return (
            <BlocksContainer>
                <Blocks visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" />
            </BlocksContainer>
        );
    }

    if (columns === []) {
        return (
            <View>
                <DeleteContainer>
                    <Button variant="danger" onClick={() => handleDeleteDb()}>
                        Delete database {props.selectedDb}
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteTable()}>
                        Delete table {props.selectedTable}
                    </Button>
                </DeleteContainer>
                <DeleteContainer>
                    <InputGroup size="sm" className="mb-3">
                        <Form.Control aria-describedby="inputGroup-sizing-sm" onChange={(event) => setAddTable(event.target.value)} />
                    </InputGroup>
                    <Button
                        className="mb-3"
                        variant="warning"
                        onClick={() => DatabaseService.postTable(props.selectedDb, { name: addTable }, responseCodes)}
                    >
                        Add Table
                    </Button>
                </DeleteContainer>
                <DeleteContainer>
                    <InputGroup size="sm" className="mb-3">
                        <Form.Control aria-describedby="inputGroup-sizing-sm" onChange={(event) => setAddTable(event.target.value)} />
                    </InputGroup>
                    <Button
                        className="mb-3"
                        variant="warning"
                        onClick={() => DatabaseService.postTable(props.selectedDb, { name: addTable }, responseCodes)}
                    >
                        Add Column
                    </Button>
                </DeleteContainer>
            </View>
        );
    }

    return (
        <View>
            <DeleteContainer>
                <Button variant="danger" onClick={() => handleDeleteDb()}>
                    Delete database {props.selectedDb}
                </Button>
                <Button variant="danger" onClick={() => handleDeleteTable()}>
                    Delete table {props.selectedTable}
                </Button>
            </DeleteContainer>
            <DeleteContainer>
                <InputGroup size="sm" className="mb-3">
                    <Form.Control aria-describedby="inputGroup-sizing-sm" onChange={(event) => setAddTable(event.target.value)} />
                </InputGroup>
                <Button
                    className="mb-3"
                    variant="warning"
                    onClick={() => DatabaseService.postTable(props.selectedDb, { name: addTable }, responseCodes)}
                >
                    AddTable
                </Button>
            </DeleteContainer>
            <DeleteContainer>
                {/* <InputGroup size="sm" className="mb-3">
                    <Form.Control aria-describedby="inputGroup-sizing-sm" onChange={(event) => setAddColumn(event.target.value)} />
                </InputGroup>
                 */}
                <InputGroup className="mb-3">
                    <DropdownButton variant="info" title={addColumnType} id="input-group-dropdown-1">
                        <Dropdown.Item href="#" onClick={() => setAddColumnType("string")}>
                            string
                        </Dropdown.Item>
                        <Dropdown.Item href="#" onClick={() => setAddColumnType("number")}>
                            number
                        </Dropdown.Item>
                        <Dropdown.Item href="#" onClick={() => setAddColumnType("boolean")}>
                            boolean
                        </Dropdown.Item>
                    </DropdownButton>
                    <InputGroup.Checkbox
                        aria-label="Checkbox for following text input"
                        onChange={(event) => setAddColumnIsIndex(event.target.checked)}
                    />
                    <Form.Control
                        aria-label="Text input with dropdown button"
                        onChange={(event) => {
                            setAddColumnName(event.target.value);
                        }}
                    />
                </InputGroup>
                <Button
                    className="mb-3"
                    variant="warning"
                    onClick={() =>
                        DatabaseService.postColumn(props.selectedDb, props.selectedTable, {
                            name: addColumnName,
                            isIndex: addColumnIsIndex,
                            type: addColumnType,
                        })
                    }
                >
                    AddColumn
                </Button>
            </DeleteContainer>
            {columns ? <AddFilters columns={columns} addFilter={addFilter} /> : null}
            {filters.length > 0 ? <Filters filters={filters} removeFilter={removeFilter} /> : null}
            {columns ? <AddSorts columns={columns} addSort={addSort} /> : null}
            {sorts.length > 0 ? <Sorts sorts={sorts} removeSort={removeSort} /> : null}

            {columns ? (
                <Table striped bordered hover size="sm" variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            {columns.map((column) => (
                                <th key={column.name}>{column.name}</th>
                            ))}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AddLine
                            columns={columns}
                            selectedDb={props.selectedDb}
                            selectedTable={props.selectedTable}
                            tableDatas={datas}
                            setTableDatas={setDatas}
                            setFilters={setFilters}
                        />
                        {datas.map((data) => {
                            return data.id === editingLine ? (
                                <TableLineEdit
                                    data={data}
                                    datas={datas}
                                    setDatas={setDatas}
                                    columns={columns}
                                    key={data.id}
                                    setEditingLine={setEditingLine}
                                    selectedDb={props.selectedDb}
                                    selectedTable={props.selectedTable}
                                />
                            ) : (
                                <TableLine
                                    data={data}
                                    datas={datas}
                                    setDatas={setDatas}
                                    columns={columns}
                                    key={data.id}
                                    setEditingLine={setEditingLine}
                                    selectedDb={props.selectedDb}
                                    selectedTable={props.selectedTable}
                                />
                            );
                        })}
                    </tbody>
                </Table>
            ) : null}
        </View>
    );
};

const View = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const DeleteContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px;
    gap: 10px;
`;

const BlocksContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default ReadTable;
