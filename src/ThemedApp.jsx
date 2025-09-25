import { createContext } from "react";

import App from "./App.jsx";

export const AppContext = createContext();

export default function ThemedApp() {
    return (
        <AppContext.Provider value={{ mode: 'dark' }}>
            <App />
        </AppContext.Provider>
    );

}