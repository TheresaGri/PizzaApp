import { useEffect, useRef, useState } from "react";
import "./App.css";
import { getPizzaByNamePriceAndAllergen } from "./data/data";
import Header from "./components/Header";
import Filter from "./components/Filter";
import BannerText from "./components/BannerText";
import Select from "./components/Select";

const maxPriceList = [
  { name: "No limit", value: 0 },
  { name: "5€", value: 5 },
  { name: "10€", value: 10 },
  { name: "15€", value: 15 },
  { name: "20€", value: 20 },
];
const allergensList = [
  { name: "No Allergen", value: 0 },
  { name: "Gluten", value: "Gluten" },
  { name: "Crustaceans", value: "GluCrustaceansten" },
  { name: "Egg", value: "Egg" },
  { name: "Fish", value: "Fish" },
  { name: "Peanut", value: "Peanut" },
  { name: "Soy", value: "Soy" },
  { name: "Lactose", value: "Lactose" },
  { name: "Nuts", value: "Nuts" },
  { name: "Celery", value: "Celery" },
  { name: "Mustard", value: "Mustard" },
  { name: "Sesame", value: "Sesame" },
  { name: "Sulphites", value: "Sulphites" },
  { name: "Lupines", value: "Lupines" },
  { name: "Molluscs", value: "Molluscs" },
];
const pizzaNamesList = [
  { name: "All Pizzas", value: 0 },
  { name: "Margherita", value: "Margherita" },
  { name: "Salami", value: "Salami" },
  { name: "Marinara", value: "Marinara" },
  { name: "Funghi", value: "Funghi" },
  { name: "Frutti di Mare", value: "Frutti di Mare" },
  { name: "Diavolo", value: "Diavolo" },
  { name: "Cardinale", value: "Cardinale" },
];

function App() {
  const divRef = useRef(null);

  const [name, setName] = useState("");
  const [maxPrice, setMaxPrice] = useState(20);
  const [allergen, setAllergen] = useState(" ");
  const [filteredPizza, setFilteredPizza] = useState([]);

  function filterPizzasByName(event) {
    setName(event.target.value);
  }

  function filterPizzasByAllergen(event) {
    setAllergen(event.target.value);
  }
	function filterPizzasByMaxPrice(event) {
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
        <BannerText></BannerText>
      </div>

      <div id="menu" ref={divRef}>
        {" "}
        <h1 id="menu-title">Menu</h1>
        <div id="filter-input">
				<Select
            array={pizzaNamesList}
            select={name}
            onChange={(event) => setName(event.target.value)}
          ></Select>
          <Select
            array={maxPriceList}
            select={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
          ></Select>
					<Select
            array={allergensList}
            select={allergen}
            onChange={(event) => setAllergen(event.target.value)}
          ></Select>
        </div>
        {filteredPizza.map((pizza) => (
          <div class="pizza-entry" key={pizza.id}>
            <div class="pizza-name">{pizza.name}</div>
            <div class="pizza-price">price: {pizza.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
