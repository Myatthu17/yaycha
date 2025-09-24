import Item from "./Item.jsx";
import List from "./List.jsx";


export default function App() {
  return (
    <div>
      <h1>Yaycha</h1>
      <List>
        <Item content="Hello, World!" name="Alice" />
        <Item content="React is fun." name="Bob" />
      </List>
    </div>
  );
}