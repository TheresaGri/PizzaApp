import { useEffect, useState } from "react";
import "./App.css";
import { getPizzas } from "./data/data";
import { getPizzaByName } from "./data/data";
import Header from "./components/Header";
import banner from "./assets/pizza-banner.jpeg";
import Filter from "./components/Filter";

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [name, setName] = useState("");
  const [filteredPizza, setFilteredPizza] = useState([]);

  useEffect(() => {
    async function loadPizzas() {
      let data = await getPizzas();
      setPizzas(data);
    }
    loadPizzas();
  }, []);

  function filterPizzas(event) {
    setName(event.target.value);
  }

  useEffect(() => {
    async function loadFilteredPizzas(name) {
      let data = await getPizzaByName(name);
      setFilteredPizza(data);
    }
    loadFilteredPizzas(name);
  }, [name]);

  return (
    <div className="homepage">
      {pizzas.map((pizza) => (
        <li key={pizza.id}>{pizza.name}</li>
      ))}
      <div id="banner">
        <Header> </Header>
        <div id="header-text">
          <h3 id="header-intro">
            When the moon hits your eye like a big pizza pie...
          </h3>
          <h1 id="header-tagline">That's Amore Pizza</h1>
          <h2 id="reserve-table">Reserve Table</h2>
          <h2 id="browse-menu">Browse Menu</h2>
        </div>
      </div>
      <Filter name={name} onChange={filterPizzas}></Filter>
      <div>
        {filteredPizza.map((pizza) => (
          <li key={pizza.id}>{pizza.name}</li>
        ))}
      </div>
    </div>
  );
}

export default App;
