import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {Backdrop, CircularProgress} from "@mui/material";
import React, {useState} from "react";
import {Navbar} from "@/components";
import {NAVBAR_ITEMS, NAVBAR_ITEMS_LOGGED} from "@/utils";
import {useToken} from "@/hooks";
import {logout} from "@/services";

function App() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const {token} = useToken();

    const onNavbarClick = (value: string) => {
        if (value === 'logout') {
            setLoading(true);
            logout(token)
                .then(() => localStorage.removeItem('token'))
                .catch((err) => console.error('Logout error', err))
                .finally(() => setLoading(false));
        } else {
            navigate(value);
        }
    }

    return (
        <div className="App">
            <Navbar items={token ? NAVBAR_ITEMS_LOGGED : NAVBAR_ITEMS}
                    active={location.pathname}
                    click={(e) => onNavbarClick(e)}/>
            <Backdrop open={loading} sx={{zIndex: 9999}}>
                <CircularProgress/>
            </Backdrop>
            <div className="RouteContainer">
                <Outlet context={{setLoading}}/>
            </div>
        </div>
    )
}

export type LoadingContext = { setLoading: React.Dispatch<React.SetStateAction<boolean>> };
export default App;
