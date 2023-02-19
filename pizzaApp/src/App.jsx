import { useEffect, useState } from "react";
import { getPizzaByName, getPizzas } from "./data/data";
import "./App.css";
import Header from "./components/Header";
import banner from "./assets/banner.webp";
import Filter from "./components/Filter";

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [name, setName] = useState("");


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
      <Header onPress={() => displayPizzas()}></Header>
      <Filter name={name} onChange={filterPizzas}></Filter>
      <div >
        {pizzas.map((pizza) => (
          <li key={pizza.id}>{pizza.name}</li>
        ))}
      </div>
      <div >
        {filteredPizza.map((pizza) => (
          <li key = {pizza.id}>{pizza.name}</li>
        ))}
      </div>
      <img id="restaurant-banner" src={banner}></img>
    </div>
  );
}

export default App;
