import {Outlet} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

export default function App() {
    return (
        <>
            <CssBaseline/>
            <Outlet/>
        </>
    );
}
