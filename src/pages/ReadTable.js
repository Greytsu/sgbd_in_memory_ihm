import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import DatabaseService from "../services/DatabaseService";
import "bootstrap/dist/css/bootstrap.min.css";
import { Blocks } from "react-loader-spinner";
import styled from "styled-components";
import TableLine from "../components/TableLine";
import TableLineEdit from "../components/TableLineEdit";
import AddLine from "../components/AddLine";

const ReadTable = (props) => {
    const [columns, setColumns] = useState(null);
    const [datas, setDatas] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [editingLine, setEditingLine] = useState(0);
    useEffect(() => {
        if (props.selectedDb && props.selectedTable) {
            console.log("props.selectedDb : ", props.selectedDb);
            console.log("props.selectedTable : ", props.selectedTable);
            DatabaseService.getColumns(props.selectedDb, props.selectedTable, setColumns);
        }
    }, [props]);

    useEffect(() => {
        if (columns != null) {
            console.log("columns : ", columns);
            DatabaseService.getDatas(props.selectedDb, props.selectedTable, setDatas);
        }
    }, [columns]);

    useEffect(() => {
        if (datas != null) {
            setIsLoading(false);
        }
    }, [datas]);

    if (isLoading) {
        return (
            <BlocksContainer>
                <Blocks visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" />
            </BlocksContainer>
        );
    }

    return (
        <View>
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
                    />
                    {datas.map((data) => {
                        return data.id === editingLine ? (
                            <TableLineEdit data={data} columns={columns} key={data.id} />
                        ) : (
                            <TableLine data={data} columns={columns} key={data.id} setEditingLine={setEditingLine} />
                        );
                    })}
                </tbody>
            </Table>
        </View>
    );
};

const View = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const BlocksContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default ReadTable;
