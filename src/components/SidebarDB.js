import { BiRefresh } from "react-icons/bi";
import { FcAddDatabase } from "react-icons/fc";
import { Blocks } from "react-loader-spinner";
import { Menu, Sidebar } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DatabaseService from "../services/DatabaseService";
import SidebarMenu from "./SidebarMenu";

const SidebarDB = (props) => {
    const navigate = useNavigate();

    return (
        <View>
            <SidebarContainer>
                <SidebarHeader>
                    <h4>SGBD in memory</h4>
                </SidebarHeader>
                <Sidebar>
                    <Menu>
                        <HeaderMenu>
                            <Btn onClick={() => navigate("/createDatabase")}>
                                <FcAddDatabase size="2em" />
                            </Btn>
                            <Btn onClick={() => DatabaseService.getStructure(props.setDatabases)}>
                                <BiRefresh size="2em" />
                            </Btn>
                        </HeaderMenu>
                        {props.databases ? (
                            props.databases.map((database) => {
                                return (
                                    <SidebarMenu
                                        database={database}
                                        key={database.name}
                                        setSelectedDb={props.setSelectedDb}
                                        setSelectedTable={props.setSelectedTable}
                                        setDatabases={props.setDatabases}
                                    />
                                );
                            })
                        ) : (
                            <BlocksContainer>
                                <Blocks
                                    visible={true}
                                    height="80"
                                    width="80"
                                    ariaLabel="blocks-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="blocks-wrapper"
                                />
                            </BlocksContainer>
                        )}
                    </Menu>
                </Sidebar>
            </SidebarContainer>
        </View>
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

const BlocksContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export default SidebarDB;
