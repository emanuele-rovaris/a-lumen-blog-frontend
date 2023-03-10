import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Home, Login, Register, Error} from "@/pages";
import {Provider} from "react-redux";
import store from "@/store/store";
import {ROUTE_PATHS} from "@/models";

// TODO try lazy loading
// TODO store export refactoring?
// TODO tests

const router = createBrowserRouter([
    {
        path: ROUTE_PATHS.HOME,
        element: <App/>,
        errorElement: <Error/>,
        children: [
            {
                path: ROUTE_PATHS.HOME,
                element: <Home/>
            },
            {
                path: ROUTE_PATHS.REGISTER,
                element: <Register/>,
            },
            {
                path: ROUTE_PATHS.LOGIN,
                element: <Login/>,
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
)
