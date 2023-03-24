import axios from "axios";
import env from "react-dotenv";
import { toast } from "react-hot-toast";

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

    postDatabase: (dbName, setResponseCode) => {
        axios
            .post(env.API_URL + "/databases", {
                name: dbName,
            })
            .then((response) => {
                toast.success("Successfully created database: " + dbName);
                setResponseCode(response.status);
            })
            .catch((error) => {
                toast.error(error.response.data.error);
            });
    },

    postTable: (dbName, table, responseCodes) => {
        axios
            .post(env.API_URL + "/databases/" + dbName + "/tables/", {
                name: table.name,
            })
            .then((response) => {
                toast.success("Successfully created table: " + table.name);
                responseCodes.push({ ...table, responseCode: response.status });
            })
            .catch((error) => {
                toast.error("Error occured while creating table: " + table.name);
                console.log(error);
            });
    },

    postColumn: (dbName, tableName, column) => {
        axios
            .post(env.API_URL + "/databases/" + dbName + "/tables/" + tableName + "/columns", {
                name: column.name,
                isIndex: column.isIndex,
                type: column.type,
            })
            .then((response) => {
                toast.success("Successfully created column: " + column.name);
            })
            .catch((error) => {
                toast.error("Error occured while creating column: " + column.name);
                console.log(error);
            });
    },
};

export default DatabaseService;
