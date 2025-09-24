import { useState } from "react";

import Item from "./Item.jsx";
import List from "./List.jsx";


export default function App() {

  const [data, setData] = useState([
    { id: 1, content: "Hello, World!", name: "Alice" },
    { id: 2, content: "React is awesome!", name: "Bob" },
    { id: 3, content: "Let's build something cool.", name: "Charlie" },
  ])

  return (
    <div>
      <h1>Yaycha</h1>
      <List>
        {data.map(item => (
          <Item key={item.id} content = {item.content} name = {item.name} />
        ))}
      </List>
    </div>
  );
}