import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {Backdrop, CircularProgress} from "@mui/material";
import React, {useState} from "react";
import {Navbar} from "@/components";
import {NAVBAR_ITEMS} from "@/utils";

function App() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="App">
            <Navbar items={NAVBAR_ITEMS} active={location.pathname} click={(e) => navigate(e)}/>
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
