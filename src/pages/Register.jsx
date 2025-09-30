import { Box, Button, TextField, Typography, Alert} from "@mui/material";

import { useRef, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { postUser } from "../../libs/fetcher";  
import { useNavigate } from "react-router-dom";
import { useApp } from "../ThemedApp";

export default function Register() {
    return (
        <Box>
            
            <Typography variant="h3">Register</Typography>

            <Alert severity="warning" sx={{ mt: 2 }}>All fields required</Alert>

            <form>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2, }}>
                    <TextField placeholder="Name" fullWidth/>
                    <TextField placeholder="Username" fullWidth/>
                    <TextField placeholder="Bio" fullWidth/>
                    <TextField type="password" placeholder="Password" fullWidth/>
                    <Button type="submit" variant="contained" fullWidth>
                        Register
                    </Button>
                </Box>
            </form>
        </Box>
    )
}