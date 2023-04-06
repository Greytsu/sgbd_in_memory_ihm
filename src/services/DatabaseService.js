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

    getTables: (dbName, structure) => {
        axios
            .get(env.API_URL + "/databases/" + dbName + "/tables")
            .then((response) => {
                structure.push({ name: dbName, tables: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    },

    getColumns: (dbName, tableName, setColumns) => {
        axios
            .get(env.API_URL + "/databases/" + dbName + "/tables/" + tableName + "/columns")
            .then((response) => {
                setColumns(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    },

    getDatas: (dbName, tableName, setDatas, filters, sorts) => {
        let url = env.API_URL + "/databases/" + dbName + "/tables/" + tableName + "/datas";
        if (filters) url += "?filters=" + filters;
        if (sorts) url += "?sorts=" + sorts;
        axios
            .get(url)
            .then((response) => {
                setDatas(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    },

    postData: (dbName, tableName, data, datas, setDatas) => {
        axios
            .post(env.API_URL + "/databases/" + dbName + "/tables/" + tableName + "/datas", data)
            .then((response) => {
                toast.success("Successfully inserted data");
                setDatas([...datas, response.data]);
            })
            .catch((error) => {
                toast.error(error.response.data.error);
            });
    },

    putData: (dbName, tableName, data, datas, setDatas) => {
        axios
            .put(env.API_URL + "/databases/" + dbName + "/tables/" + tableName + "/datas/" + data.id, { ...data, id: Number(data.id) })
            .then((response) => {
                toast.success("Successfully updated data");
                setDatas(datas.map((newData) => (newData.id === data.id ? data : newData)));
            })
            .catch((error) => {
                toast.error(error.response.data.error);
            });
    },

    deleteData: (dbName, tableName, dataId, datas, setDatas) => {
        axios
            .delete(env.API_URL + "/databases/" + dbName + "/tables/" + tableName + "/datas/" + dataId)
            .then((response) => {
                toast.success("Successfully deleted data");
                setDatas(datas.filter((data) => data.id !== dataId));
            })
            .catch((error) => {
                toast.error(error.response.data.error);
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
            .post(env.API_URL + "/databases/" + dbName + "/tables", {
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

    deleteDatabase: (dbName) => {
        axios
            .delete(env.API_URL + "/databases/" + dbName)
            .then((response) => {
                toast.success("Successfully deleted database");
            })
            .catch((error) => {
                toast.error(error.response.data.error);
            });
    },

    deleteTable: (dbName, tableName) => {
        axios
            .delete(env.API_URL + "/databases/" + dbName + "/tables/" + tableName)
            .then((response) => {
                toast.success("Successfully deleted table");
            })
            .catch((error) => {
                toast.error(error.response.data.error);
            });
    },
};

export default DatabaseService;
