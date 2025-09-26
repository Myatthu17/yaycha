import { useState } from "react";

import { Box, Container } from "@mui/material";

import Item from "./components/Item.jsx";
import Header from "./components/Header.jsx";
import Form from "./components/Form.jsx";
import { useApp } from "./ThemedApp.jsx";


export default function App() {

  const { showForm } = useApp();

  const [data, setData] = useState([
    { id: 1, content: "Hello, World!", name: "Alice" },
    { id: 2, content: "React is awesome!", name: "Bob" },
    { id: 3, content: "Let's build something cool.", name: "Charlie" },
  ]);

  const remove = (id) => {
    setData(data.filter(item => item.id !== id))
  };

  const add = (content, name) => {
    const id = data[0].id + 1;
    setData([{id, content, name }, ...data]);
  };

  return (
    <Box>
      <Header />

      <Container
        maxWidth="sm"
        sx={{ mt: 4 }}>

        {showForm && <Form add={add} />}

        {data.map(item => {
          return (
            <Item
              key={item.id}
              item={item}
              remove={remove}
            />
          );
        })}

      </Container>
    </Box>
  );
}