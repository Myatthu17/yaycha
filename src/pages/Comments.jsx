import { Box, Button, TextField, Alert } from "@mui/material";
import Item from "../components/Item";

import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, useApp } from "../ThemedApp";

import { postComment, deleteComment, deletePost } from "../../libs/fetcher";

const api = import.meta.env.VITE_API;

export default function Comments() {
  const { id } = useParams();
  const navigate = useNavigate();
  const contentInput = useRef();

  const { setGlobalMsg, auth } = useApp();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await fetch(`${api}/content/posts/${id}`);
      return res.json();
    }
  })

  const addComment = useMutation({
    mutationFn: content => postComment(content, id),
    onSuccess: async comment => {
      await queryClient.cancelQueries({ queryKey: ["comments"]})
      await queryClient.setQueryData(["comments"], old => {
        old.comments = [...old.comments, comment]
        return { ...old }
      })
      setGlobalMsg("A comment added")
    },
  })

  const removePost = useMutation({
        mutationFn : async id => {
            await deletePost(id);
            return id;
        },
        onSuccess: () => {
            navigate("/")
            setGlobalMsg("The post has been deleted")
        },
    })

  const removeComment = useMutation({
    mutationFn: async id => {
      await deleteComment(id);
      return id;
    },
    onSuccess: async id => {
      await queryClient.cancelQueries({ queryKey: ["comments"] });
      await queryClient.setQueryData(["comments"], old => {
        old.comments = old.comments.filter(item => item.id !== id)
        return { ...old }
      }
      )
      setGlobalMsg("A comment has been deleted")
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

  let isPostOwner = false;

  if (auth && auth.id) {
    isPostOwner = auth.id === data.userId;
  }


  return (
    <Box>
      <Item
        primary
        item={data}
        remove={removePost.mutate}
        isOwner={isPostOwner}
      />

      {data.comments.map(comment => {
        const isOwner = auth?.id  && auth.id === comment.userId
        return (
          <Item
            comment
            key={comment.id}
            item={comment}
            remove={removeComment.mutate}
            isOwner={isOwner}
          />
        )
      })}

      {auth && (
      <form
        onSubmit={e => {
          e.preventDefault();
          const content = contentInput.current.value;
          
          if(!content) return false;

          addComment.mutate(content)

          e.currentTarget.reset();
        }}>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 3 }}>
          <TextField inputRef={contentInput} multiline placeholder="Your Comment" />
          <Button type="submit" variant="contained">Reply</Button>
        </Box>
      </form>
      )}


    </Box>
  );
}