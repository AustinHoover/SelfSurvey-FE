import * as React from "react";
import { createRoot } from 'react-dom/client';
import App from "./app";

const root = createRoot(document.getElementById('root')!);

/**
 * Proxy component wrapping <app> so that it stops throwing stupid react hooks errors
 * @returns
 */
const AppProxy = () => {
  return (
    <React.StrictMode>
        <App/>
    </React.StrictMode>
  );
}

export default AppProxy
