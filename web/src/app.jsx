import {Outlet} from "react-router-dom";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";

export default function App() {
    return (
        <>
            <CssBaseline/>
            <Outlet/>
        </>
    );
}
