import { createContext, useState, useContext, useMemo } from "react";
import { 
    CssBaseline, 
    ThemeProvider, 
    createTheme, 
    Snackbar,
} from "@mui/material";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import { deepPurple, grey } from "@mui/material/colors";

import Template from "./Template";
import Home from "./pages/Home";
import Login from "./pages/Login";


const AppContext = createContext();

export function useApp() {
    return useContext(AppContext);
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Template />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
        ],
    }, 
]);

export default function ThemedApp() {
    const [showForm, setShowForm] = useState(false);
    const [mode, setMode] = useState('dark');
    const [showDrawer, setShowDrawer] = useState(false);
    const [globalMsg, setGlobalMsg] = useState(null);
    const [auth, setAuth] = useState(null);

    const theme = useMemo(() => {
        return createTheme({
        palette: { 
            mode,
            primary: deepPurple,
            banner: mode  === 'dark' ? grey[800] : grey[200],
            text: {
                fade: grey[500],
            },
         },
    });
    }, [ mode ]);

    return (
        <ThemeProvider theme={theme}> 
            <AppContext.Provider value={{ 
                showForm, 
                setShowForm, 
                mode, 
                setMode,
                showDrawer,
                setShowDrawer,
                globalMsg,
                setGlobalMsg,
                auth,
                setAuth, 
            }}>

                <RouterProvider router={router}/>
                <CssBaseline />
            </AppContext.Provider>
        </ThemeProvider>
    );

}