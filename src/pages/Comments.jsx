import { Box, Button, TextField, Alert } from "@mui/material";
import Item from "../components/Item";

import { userParamas, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "../ThemedApp";

const api = import.meta.env.VITE_API;

export default function Comments() {
    return (
        <Box>
            <Item
              primary
              key={1}
              item={{
                id: 1,
                content: "Initial post content for Myat Thu",
                name: "Myat Thu",
              }}
              remove={() => {}}
            />

            <Item
              key={2}
              item={{
                id: 2,
                content: "A comment from Haru",
                name: "Haru",
              }}
              remove={()=> {}}
            />

            <Item
              key={3}
              item={{
                id: 2,
                content: "A comment reply from Myat Thu",
                name: "Myat Thu",
              }}
              remove={()=> {}}
            />

            <form>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 3}}>
                    <TextField multiline placeholder="Your Comment" />
                    <Button type="submit" variant="contained">Reply</Button>
                </Box>
            </form>
        </Box>
    );
}