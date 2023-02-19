import { useEffect, useRef, useState } from "react";
import "./App.css";
import { getPizzaByNamePriceAndAllergen } from "./data/data";
import Header from "./components/Header";
import banner from "./assets/pizza-banner.jpeg";
import Filter from "./components/Filter";

function App() {
  const divRef = useRef(null);

  const [name, setName] = useState("");
  const [maxPrice, setMaxPrice] = useState(20);
  const [allergen, setAllergen] = useState("");
  const [filteredPizza, setFilteredPizza] = useState([]);

  function filterPizzasByName(event) {
    setName(event.target.value);
  }

  function filterPizzasByPrice(event) {
    setMaxPrice(event.target.value);
  }

  function filterPizzasByAllergen(event) {
    setAllergen(event.target.value);
  }

  useEffect(() => {
    async function loadFilteredPizzas(name, maxPrice, allergen) {
      let data = await getPizzaByNamePriceAndAllergen(name, maxPrice, allergen);
      console.log(data);
      setFilteredPizza(data);
    }
    loadFilteredPizzas(name, maxPrice, allergen);
  }, [name, maxPrice, allergen]);

  console.log(filteredPizza);

  return (
    <div className="homepage">
      <div id="banner">
        <Header
          onclick={() => divRef.current?.scrollIntoView({ behavior: "smooth" })}
        ></Header>
        <div id="header-text">
          <h3 id="header-intro">
            When the moon hits your eye like a big pizza pie...
          </h3>
          <h1 id="header-tagline">That's Amore Pizza</h1>
          <h2 id="reserve-table">Reserve Table</h2>
          <h2 id="browse-menu">Browse Menu</h2>
        </div>
      </div>
      <Filter
        value={name}
        placeholder={"Search pizzas by name"}
        onChange={filterPizzasByName}
      ></Filter>
      <Filter
        value={maxPrice}
        placeholder={"Search pizzas by price"}
        onChange={filterPizzasByPrice}
      ></Filter>
      <Filter
        value={allergen}
        placeholder={"Search pizzas by allergen"}
        onChange={filterPizzasByAllergen}
      ></Filter>
      <div ref={divRef}>
        {filteredPizza.map((pizza) => (
          <div key={pizza.id}>
            <div>{pizza.name}</div>
            <div>price: {pizza.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
