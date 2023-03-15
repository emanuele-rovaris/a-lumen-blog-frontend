import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {CreatePost, Error, Home, Login, Post, Register} from "@/pages";
import {Provider} from "react-redux";
import store from "@/store/store";
import {ROUTE_PATHS} from "@/models";
import {ProtectedRoute} from "@/components";

// TODO tests (exclude from build)

const router = createBrowserRouter(createRoutesFromElements(
    <Route path={ROUTE_PATHS.HOME} element={<App/>} errorElement={<Error/>}>
        <Route path={ROUTE_PATHS.HOME} element={<Home/>}/>
        <Route path={ROUTE_PATHS.REGISTER} element={<Register/>}/>
        <Route path={ROUTE_PATHS.LOGIN} element={<Login/>}/>
        <Route path={`${ROUTE_PATHS.POST}/:postId`} element={<ProtectedRoute><Post/></ProtectedRoute>}/>
        <Route path={ROUTE_PATHS.CREATE_POST} element={<ProtectedRoute><CreatePost/></ProtectedRoute>}/>
    </Route>
))

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
)
