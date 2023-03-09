import styled from "styled-components";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

const SidebarDB = () => {
    return (
        <SidebarContainer>
            <Sidebar>
                <Menu>
                    <SubMenu label="Charts">
                        <MenuItem> Pie charts </MenuItem>
                        <MenuItem> Line charts </MenuItem>
                    </SubMenu>
                    <MenuItem> Documentation </MenuItem>
                    <MenuItem> Calendar </MenuItem>
                </Menu>
            </Sidebar>
        </SidebarContainer>
    );
};

const SidebarContainer = styled.div`
    display: flex;
    height: 100%;
`;

export default SidebarDB;
