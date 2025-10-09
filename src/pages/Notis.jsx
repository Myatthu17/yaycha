import {
    Alert,
    Box,
    Card,
    Avatar,
    Button,
    Typography,
    CardContent,
    CardActionArea,
} from "@mui/material";

import {
    Comment as CommentIcon,
    Favorite as FavoriteIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useQuery, useMutation } from "@tanstack/react-query"
import { queryClient } from "../ThemedApp";

import {
    fetchNotis,
    putAllNotisRead,
    putNotiRead
} from "../../libs/fetcher"

export default function Notis() {
    const navigate = useNavigate();

    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["notis"],
        queryFn: fetchNotis
    })

    const readAllNotis = useMutation({
        mutationFn: putAllNotisRead,
        onMutate: async () => {
            await queryClient.cancelQueries(["notis"]);
            const previous = queryClient.getQueryData(["notis"]);
            queryClient.setQueryData(["notis"], old =>
                old.map(n => ({ ...n, read: true }))
            );
            return { previous };
        },
        onError: (err, _, context) => {
            queryClient.setQueryData(["notis"], context.previous);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["notis"]);
        },
    });


    const readNoti = useMutation({
        mutationFn: id => putNotiRead(id),
        onMutate: async () => {
            await queryClient.cancelQueries(["notis"]);
            const previous = queryClient.getQueryData(["notis"]);
            queryClient.setQueryData(["notis"], old =>
                old.map(n => ({ ...n, read: true }))
            );
            return { previous };
        },
        onSettled: () => {
            queryClient.invalidateQueries(["notis"]);
        },
    });

    if (isError) {
        return (
            <Box>
                <Alert severity="warning">{error.message}</Alert>
            </Box>
        )
    }

    if (isLoading) {
        return <Box sx={{ textAlign: "center" }}>Loading...</Box>
    }

    return (
        <Box>
            <Box sx={{ display: "flex", mb: 2 }}>
                <Box sx={{ flex: 1 }}></Box>
                <Button
                    size="small"
                    variant="outlined"
                    sx={{ borderRadius: 5 }}
                    onClick={() => {
                        readAllNotis.mutate();
                    }}>
                    Mark all as read
                </Button>
            </Box>

            {data.map(noti => {
                return (
                    <Card
                        sx={{ mb: 2, opacity: noti.read ? 0.3 : 1 }}
                        key={noti.id}>
                        <CardActionArea
                            onClick={() => {
                                readNoti.mutate(noti.id);
                                navigate(`/comments/${noti.postId}`)
                            }}>
                            <CardContent
                                sx={{
                                    display: "flex",
                                    opacity: 1,
                                }}>
                                {noti.type == "comment" ? (
                                    <CommentIcon color="success" />
                                ) : (
                                    <FavoriteIcon color="error" />
                                )}

                                <Box sx={{ ml: 3 }}>
                                    <Avatar />

                                    <Box sx={{ mt: 1 }}>
                                        <Typography
                                            component="span"
                                            sx={{ mr: 1 }}>
                                            <b>{noti.user.name}</b>
                                        </Typography>

                                        <Typography
                                            component="span"
                                            sx={{
                                                mr: 1,
                                                color: "text.secondary",
                                            }}>
                                            {noti.content}
                                        </Typography>

                                        <Typography
                                            component="span"
                                            sx={{
                                                mr: 1,
                                                color: "primary",
                                            }}>
                                            <small>
                                                {format(
                                                    noti.created,
                                                    "MMM dd, yyyy"
                                                )}
                                            </small>

                                        </Typography>

                                    </Box>

                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )
            })}
        </Box>

    )
}