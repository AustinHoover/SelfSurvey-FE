import * as React from "react";
import { createRoot } from 'react-dom/client';
// import ReactDOM from 'react-dom';
import AppProxy from "./appproxy.tsx";

const root = createRoot(document.getElementById('root'));

root.render(AppProxy())