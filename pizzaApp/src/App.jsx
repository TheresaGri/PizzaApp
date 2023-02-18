import { useEffect, useState } from "react";
import "./App.css";

async function getPizzas() {
  const url = "http://localhost:3000/api/pizzas";
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

function App() {
  const [pizzas, setPizzas] = useState([]);

  // useEffect(() => {

  //   }
  async function showPizzas() {
    let data = await getPizzas();
    setPizzas(data);
    showPizzas();
    // }, [pizzas]);
  }
  showPizzas();

  return (
    <div className="App">
      {pizzas.map((pizza) => (
        <li>{pizza.name}</li>
      ))}
    </div>
  );
}

export default App;
