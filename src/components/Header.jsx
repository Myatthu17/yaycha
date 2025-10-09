import { useApp } from "../ThemedApp";

import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
} from "@mui/material";

import {
    Menu as MenuIcon,
    Add as AddIcon,
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon,
    Notifications as NotiIcon
} from "@mui/icons-material";

import SearchIcon from "@mui/icons-material/Search"

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchNotis } from "../../libs/fetcher";

export default function Header() {
    const { showForm, setShowForm, mode, setMode, showDrawer, setShowDrawer, auth } = useApp();
    const navigate = useNavigate();

    const { isLoading, isError, data } = useQuery({
        queryKey: ["notis", auth],
        queryFn: fetchNotis
    })

    const notiCount = useMemo(() => {
        if (!auth || !data) return 0;
        if (isLoading || isError) return 0;

        return data.filter(noti => !noti.read).length;
    }, [auth, isLoading, isError, data]);

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={()=> setShowDrawer(!showDrawer)}>
                        <MenuIcon/>
                </IconButton>

                <Typography sx={{ flexGrow: 1, ml: 2 }}>Yaycha</Typography>


                <Box>
                    <IconButton
                        color="inherit"
                        onClick={()=> setShowForm(!showForm)}>
                            <AddIcon/>
                    </IconButton>

                    <IconButton
                      color="inherit"
                      onClick={() => navigate("/notis")}>
                        <Badge
                          color="error"
                          badgeContent={notiCount}>
                            <NotiIcon />
                        </Badge>
                    </IconButton>

                    <IconButton
                      color="inherit"
                      onClick={() => navigate("/search")}>
                        <SearchIcon />
                    </IconButton>

                    { mode == 'dark' ? 
                        (<IconButton
                            color="inherit"
                            edge="end"
                            onClick={() => setMode("light")}>
                            <LightModeIcon/>
                        </IconButton>) :

                        (<IconButton
                            color="inherit"
                            edge="end"
                            onClick={() => setMode("dark")}>
                            <DarkModeIcon/>
                        </IconButton>)
                    }      

                </Box>

            </Toolbar>
        </AppBar>
    );
}