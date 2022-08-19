import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

import Login from "./routes/login";
import Register from "./routes/register";
import Page from "./routes/page"
import Home from './routes/home';
import './styles.css'

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path=":seourl" element={<Page />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
