import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {Backdrop, CircularProgress} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Navbar, Notification} from "@/components";
import {NAVBAR_ITEMS, NAVBAR_ITEMS_LOGGED, NOTIFICATION_STATUS} from "@/utils";
import {useToken} from "@/hooks";
import {logout, me} from "@/services";
import {useAppDispatch, useAppSelector} from "@/store/store";
import {setNotificationAction} from "@/store/slices/notificationSlice";
import {ROUTE_PATHS} from "@/models";
import {setUserAction} from "@/store/slices/userSlice";

function App() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const {token} = useToken();
    const notification = useAppSelector(state => state.notification);
    const dispatch = useAppDispatch();

    const onNavbarClick = (value: string) => {
        if (value === ROUTE_PATHS.LOGOUT) {
            setLoading(true);
            logout(token)
                .then(() => {
                    dispatch(setNotificationAction({
                        status: NOTIFICATION_STATUS.SUCCESS,
                        open: true,
                        message: 'Logout successful!',
                    }));
                    localStorage.removeItem('token');
                    dispatch(setUserAction({id: null}));
                    navigate(ROUTE_PATHS.HOME);
                })
                .catch((err) => {
                    dispatch(setNotificationAction({
                        status: NOTIFICATION_STATUS.ERROR,
                        open: true,
                        message: `Logout error!\n${err.message}`,
                    }));
                })
                .finally(() => setLoading(false));
        } else {
            navigate(value);
        }
    }

    useEffect(() => {
        if (token) {
            me(token)
                .then((res) => {
                    dispatch(setUserAction({id: res.id}));
                })
                .catch((err) => console.error(err));
        }
    }, [token]);

    return (
        <div className="App">
            <Navbar items={token ? NAVBAR_ITEMS_LOGGED : NAVBAR_ITEMS}
                    active={location.pathname}
                    click={(e) => onNavbarClick(e)}/>
            <Backdrop open={loading} sx={{zIndex: 9999}}>
                <CircularProgress/>
            </Backdrop>
            <Notification notification={notification}
                          onClose={() => dispatch(setNotificationAction({open: false, status: null, message: null}))}/>
            <div className="RouteContainer">
                <Outlet context={{setLoading}}/>
            </div>
        </div>
    )
}

export type LoadingContext = { setLoading: React.Dispatch<React.SetStateAction<boolean>> };
export default App;
