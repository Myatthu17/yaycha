import {
    Box,
    Typography,
    List,
    ListItem,
    Avatar,
    ListItemText,
    ListItemAvatar, 
} from "@mui/material";


export default function UserList({ title }) {
    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3 }}>
                {title}
            </Typography>

            <List>
                <ListItem>
                    <ListItemAvatar><Avatar /></ListItemAvatar>
                    <ListItemText
                      primary="Myat Thu @myatthu"
                      secondary="Myat Thu's profile bio"
                    />
                </ListItem>
            </List>
        </Box>
    );
}