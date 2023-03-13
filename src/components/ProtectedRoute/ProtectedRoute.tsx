import React from 'react'
import {Navigate} from "react-router-dom"
import {useToken} from "@/hooks";
import {ROUTE_PATHS} from "@/models";

interface IProtectedRouteProps {
    children: any;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({children}) => {
    const {token} = useToken();

    if (!token) {
        return <Navigate to={ROUTE_PATHS.LOGIN} replace/>
    }
    return children;

};

export default ProtectedRoute;