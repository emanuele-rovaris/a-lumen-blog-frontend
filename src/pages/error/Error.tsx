import React from "react";
import {useRouteError} from "react-router-dom";

const Error: React.FC = () => {
    const error = useRouteError();
    // @ts-ignore
    return <div>{error.statusText || error.message || 'Error'}</div>
}

export default Error;