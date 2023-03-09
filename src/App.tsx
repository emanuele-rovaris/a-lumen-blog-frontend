import {Outlet} from 'react-router-dom';
import {Backdrop, CircularProgress} from "@mui/material";
import React, {useState} from "react";

function App() {
    const [loading, setLoading] = useState(false);

    return (
        <div className="App">
            <h1>Vite + React</h1>
            <Backdrop open={loading} sx={{zIndex: 9999}}>
                <CircularProgress/>
            </Backdrop>
            <Outlet context={{setLoading}}/>
        </div>
    )
}

export type LoadingContext = { setLoading: React.Dispatch<React.SetStateAction<boolean>> };
export default App;
