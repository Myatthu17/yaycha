import { useState, useEffect } from "react";

import { Box } from "@mui/material";

import Form from "../components/Form";
import Item from "../components/Item";

import { useApp } from "../ThemedApp";

export default function Home() {
    const { showForm, setGlobalMsg } = useApp();
    const [data, setData] = useState([]);

    async function fetchPosts() {
        const api = import.meta.env.VITE_API;
        const res = await fetch(`${api}/content/posts`);
        const json = await res.json();
        setData(json);
    }

    useEffect(() => {
        const api = import.meta.env.VITE_API;
        fetchPosts();
    })

    const remove = (id) => {
        setData(data.filter(item => item.id !== id));
        setGlobalMsg("An item deleted");
    };

    const add = (content, name) => {
        const id = data[0].id + 1;
        setData([{id, content, name }, ...data]);
        setGlobalMsg("An item added")
    };

    return (
        <Box>
            {showForm && <Form add={add}/>}

            {data.map(item=> {
                return (
                    <Item key={item.id} item={item} remove={remove}/>
                )
            })}
        </Box>
    )
}