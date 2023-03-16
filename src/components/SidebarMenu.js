import React from "react";
import { MenuItem, SubMenu } from "react-pro-sidebar";
import { BiRefresh } from "react-icons/bi";
import { FcAddDatabase } from "react-icons/fc";
import styled from "styled-components";
import DatabaseService from "../services/DatabaseService";

const setSelectedItems = (dbName, setSelectedDb, tableName, setSelectedTable) => {
    setSelectedDb(dbName);
    setSelectedTable(tableName);
};

const SidebarMenu = (props) => {
    return (
        <>
            <HeaderMenu>
                <Btn onClick={() => console.log("add")}>
                    <FcAddDatabase size="2em" />
                </Btn>
                <Btn onClick={() => DatabaseService.getStructure(props.setDatabases)}>
                    <BiRefresh size="2em" />
                </Btn>
            </HeaderMenu>
            <SubMenu label={props.database.name}>
                {props.database.tables.map((table) => {
                    return (
                        <MenuItem
                            onClick={() => {
                                setSelectedItems(props.database.name, props.setSelectedDb, table.name, props.setSelectedTable);
                            }}
                            key={table.name}
                        >
                            {table.name}
                        </MenuItem>
                    );
                })}
            </SubMenu>
        </>
    );
};

const Btn = styled.button`
    border: 0;
    margin: 10px;
`;

const HeaderMenu = styled.div`
    display: flex;
    flex: row;
    justify-content: space-around;
`;

export default SidebarMenu;
