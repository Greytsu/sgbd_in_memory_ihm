import React, { useEffect } from "react";
import { MenuItem, SubMenu } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";

const setSelectedItems = (dbName, setSelectedDb, tableName, setSelectedTable, navigate) => {
    setSelectedDb(dbName);
    setSelectedTable(tableName);
    navigate("/");
};

const SidebarMenu = (props) => {
    const navigate = useNavigate();

    return (
        <>
            <SubMenu label={props.database.name} key={props.database.name}>
                {props.database.tables.map((table) => {
                    return (
                        <MenuItem
                            onClick={() => {
                                setSelectedItems(props.database.name, props.setSelectedDb, table.name, props.setSelectedTable, navigate);
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

export default SidebarMenu;
