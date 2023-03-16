import React from "react";
import { MenuItem, SubMenu } from "react-pro-sidebar";

const setSelectedItems = (dbName, setSelectedDb, tableName, setSelectedTable) => {
    setSelectedDb(dbName);
    setSelectedTable(tableName);
};

const SidebarMenu = (props) => {
    return (
        <>
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

export default SidebarMenu;
