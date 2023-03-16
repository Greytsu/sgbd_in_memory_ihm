import axios from "axios";
import env from "react-dotenv";

const DatabaseService = {
    getStructure: (setDatabases) => {
        axios
            .get(env.API_URL + "/databases")
            .then((response) => {
                setDatabases(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    },
};

export default DatabaseService;
