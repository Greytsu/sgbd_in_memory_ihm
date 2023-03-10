import styled from "styled-components";
import { Sidebar, Menu } from "react-pro-sidebar";
import SidebarMenu from "./SidebarMenu";

const SidebarDB = (props) => {
    return (
        <View>
            <SidebarContainer>
                <SidebarHeader>
                    <h3>SGBD in memory</h3>
                </SidebarHeader>
                <Sidebar>
                    <Menu>
                        {props.databases.map((database) => {
                            return (
                                <SidebarMenu
                                    database={database}
                                    key={database}
                                    setSelectedDb={props.setSelectedDb}
                                    setSelectedTable={props.setSelectedTable}
                                />
                            );
                        })}
                    </Menu>
                </Sidebar>
            </SidebarContainer>
        </View>
    );
};

const View = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #f4f4f4;
`;

const SidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const SidebarHeader = styled.div`
    display: flex;
    flex-direction: row;
    height: 4%;
    align-items: center;
    justify-content: center;
    background-color: #1c1f2b;
    color: #fff;
`;

export default SidebarDB;
