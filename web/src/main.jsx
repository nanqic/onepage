import * as React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./app";
import Page from "./pages/page"
import Home from './pages/home';
import PageNotFound from "@/pages/page-not-found.jsx";
import SharedPage from "@/pages/shared-page";
import InternalServerError from "@/pages/internal-server-error";

const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route index element={<Home/>}/>
                    <Route path=":seourl" element={<Page/>}/>
                </Route>
                <Route path="/share" element={<SharedPage/>}/>
                <Route path="/404" element={<PageNotFound/>}/>
                <Route path="/500" element={<InternalServerError/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
