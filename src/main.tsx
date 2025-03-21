import React from "react";
import ReactDOM from "react-dom/client";
import Router from "@/routes";
import { BrowserRouter } from "react-router-dom";

import "@/styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/admin-panel">
      <Router />
    </BrowserRouter>
  </React.StrictMode>
);
