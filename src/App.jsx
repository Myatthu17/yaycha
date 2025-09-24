import { useState } from "react";

import Item from "./Item.jsx";
import List from "./List.jsx";


export default function App() {

  const [data, setData] = useState([
    { id: 1, content: "Hello, World!", name: "Alice" },
    { id: 2, content: "React is awesome!", name: "Bob" },
    { id: 3, content: "Let's build something cool.", name: "Charlie" },
  ]);

  const remove = (id) => {
    setData(data.filter(item=> item.id !== id))
  };

  return (
    <div>
      <h1>Yaycha</h1>
      <List>
        {data.map(item => {
          return (
          <Item 
          key={item.id} 
          item={item} 
          remove={remove}
          />
        );
        })}
      </List>
    </div>
  );
}