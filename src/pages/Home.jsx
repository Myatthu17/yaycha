import { Box, Alert, Button, Typography } from "@mui/material";

import Form from "../components/Form";
import Item from "../components/Item";

import { useApp, queryClient } from "../ThemedApp";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { postPost, deletePost, fetchFollowingPosts, fetchPosts } from "../../libs/fetcher";

const api = import.meta.env.VITE_API;


export default function Home() {
    const [showLatest, setShowLatest ] = useState(true);
    const { showForm, setGlobalMsg, auth } = useApp();
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["posts", showLatest], 
        queryFn: async () => {
            if (showLatest) return fetchPosts();
            else return fetchFollowingPosts();
        }
    });

    const remove = useMutation({
        mutationFn : async id => {
            await deletePost(id);
            return id;
        },
        onSuccess: async id => {
            await queryClient.cancelQueries({ queryKey: ["posts"] });
            await queryClient.setQueryData(["posts", showLatest], old => 
                old.filter(item => item.id !== id)
            )
            setGlobalMsg("A post has been deleted")
        },
    })

    const add = useMutation({
        mutationFn: async content => postPost(content),
        onSuccess: async post => {
            await queryClient.cancelQueries(["posts"])
            await queryClient.setQueryData(["posts", showLatest], old => [post, ...old])
            setGlobalMsg("A post added")
        },
    })

    if (isError) {
        return (
            <Box>
                <Alert severity="warning">{error.message}</Alert>
            </Box>
        )
    }

    if (isLoading) {
        return (
            <Box sx={{ textAlign: "center", mt: 5 }}>
                Loading...
            </Box>
        )
    }

    return (
        <Box>
            {showForm && auth && <Form add={add} />}

            {auth && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 1,
                  }}>
                    
                    <Button
                      disabled={showLatest}
                      onClick={() => setShowLatest(true)}>
                        Latest
                    </Button>

                    <Typography sx={{ color: "text.fade", fontSize: 15}}>
                        |
                    </Typography>

                    <Button
                      disabled={!showLatest}
                      onClick={() => setShowLatest(false)}>
                        Following
                    </Button>
                </Box>
            )}

            {data.length == 0 ? (
                <Alert severity="info">No posts yet.</Alert>
            ) : data.map(item => {
                return (
                    <Item
                      key={item.id}
                      item={item}
                      remove={remove.mutate}
                    />
                )
            })}
        </Box>
    )
}