import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ReadTable = () => {
    let { name } = useParams();

    useEffect(() => {
        console.log(name);
    }, [name]);

    return <div></div>;
};

export default ReadTable;
