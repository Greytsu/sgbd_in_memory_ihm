import { BrowserRouter as Router, Route, Routes as RoutesGroup } from "react-router-dom";
import styled from "styled-components";
import CreateDatabase from "../pages/CreateDatabase";

const Routes = () => {
    return (
        <View>
            <Router>
                <RoutesGroup>
                    <Route exact path="/" element={<CreateDatabase />}></Route>
                    <Route exact path="/createDatabase" element={<CreateDatabase />}></Route>
                    {/* <Route exact path="/databases/:id/">
                            <PlaylistDetails loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                        </Route> */}
                </RoutesGroup>
            </Router>
        </View>
    );
};

const View = styled.div`
    height: 100%;
    width: 100%;
`;

export default Routes;
