import {ReactNode} from 'react';
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom';

interface RenderRouteWithOutletContextProps<T = any> {
    context: T;
    children: ReactNode;
}

export const RenderRouteWithOutletContext = <T, >({context, children}: RenderRouteWithOutletContextProps<T>) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Outlet context={context as T}/>}>
                    <Route index element={children}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};