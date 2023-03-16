import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import CreateDatabase from "../pages/CreateDatabase";

const Routes = () => {
    return (
        <View>
            <Router>
                <Route exact path="/createDatabase">
                    <CreateDatabase />
                </Route>
                {/* <Route exact path="/playlistsDetails/:id">
                            <PlaylistDetails loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                        </Route> */}
            </Router>
        </View>
    );
};

const View = styled.div`
    height: 100%;
    width: 100%;
`;

export default Routes;
