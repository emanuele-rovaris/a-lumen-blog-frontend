import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Error, Home, Login, Post, Register} from "@/pages";
import {Provider} from "react-redux";
import store from "@/store/store";
import {ROUTE_PATHS} from "@/models";

// TODO post detail page
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
            {
                path: `${ROUTE_PATHS.POST}/:postId`,
                element: <Post/>
            }
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
