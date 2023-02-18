import { useEffect, useState } from "react";
import "./App.css";
import { getPizzas } from "./data/data";

function App() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    async function loadPizzas() {
      let data = await getPizzas();
      setPizzas(data);
    }
    loadPizzas();
  }, []);

  return (
    <div className="App">
      {pizzas.map((pizza) => (
        <li>{pizza.name}</li>
      ))}
    </div>
  );
}

export default App;
