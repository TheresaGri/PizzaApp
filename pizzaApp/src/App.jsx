import { useEffect, useRef, useState } from "react";
import "./App.css";
import { getPizzaById, getPizzaByNamePriceAndAllergen } from "./data/data";
import Header from "./components/Header";
import Filter from "./components/Filter";
import BannerText from "./components/BannerText";
import Select from "./components/Select";
import Button from "./components/Button";

function App() {
  const divRef = useRef(null);

  const [name, setName] = useState("");
  const [maxPrice, setMaxPrice] = useState(20);
  const [allergen, setAllergen] = useState("");
  const [filteredPizza, setFilteredPizza] = useState([]);
  const [idOfOrder, setidOfOrder] = useState(0);
  const [orderedPizza, setOrderedPizza] = useState([]);
  const [deleteOrAdd, setDeleteOrAdd] = useState("");

  function filterPizzasByName(event) {
    setName(event.target.value);
  }

  function filterPizzasByAllergen(event) {
    setAllergen(event.target.value);
  }

  useEffect(() => {
    async function loadFilteredPizzas(name, maxPrice, allergen) {
      let data = await getPizzaByNamePriceAndAllergen(name, maxPrice, allergen);
      setFilteredPizza(data);
    }
    loadFilteredPizzas(name, maxPrice, allergen);
  }, [name, maxPrice, allergen]);

  function addToOrder(id) {
    setidOfOrder(id);
    setDeleteOrAdd("add");
  }

  function deleteOrder(id) {
    setidOfOrder(id);
    setDeleteOrAdd("delete");
  }

  useEffect(() => {
    async function loadPizzaById(id) {
      let data = await getPizzaById(id);
      let dataOfOrderedPizza = [{ id: data.id, amount: 1, name: data.name }];
      orderedPizza.map((order) => {
        if (order.id === dataOfOrderedPizza[0].id && deleteOrAdd === "add") {
          order.amount += 1;
          dataOfOrderedPizza = [];
        } else if (
          order.id === dataOfOrderedPizza[0].id &&
          deleteOrAdd === "delete"
        ) {
          if (order.amount > 0) {
            order.amount -= 1;
          } else {
            order.amount = 0;
          }
          dataOfOrderedPizza = [];
        }
      });
      setOrderedPizza([...orderedPizza, ...dataOfOrderedPizza]);
    }
    loadPizzaById(idOfOrder);
    setidOfOrder(0);
  }, [idOfOrder]);

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
          <Filter
            value={name}
            placeholder={"Search pizzas by name"}
            onChange={filterPizzasByName}
          ></Filter>
          <Select
            select={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
          ></Select>
          <Filter
            value={allergen}
            placeholder={"Search pizzas by allergen"}
            onChange={filterPizzasByAllergen}
          ></Filter>
        </div>
        {filteredPizza.map((pizza) => (
          <div className="pizza-entry" key={pizza.id}>
            <div className="pizza-name">{pizza.name}</div>
            <div className="pizza-price">price: {pizza.price}</div>
            <Button onPress={() => deleteOrder(pizza.id)}>-</Button>
            <Button onPress={() => addToOrder(pizza.id)}>+</Button>
          </div>
        ))}
      </div>
      <div>
        Order:
        <div>
          {orderedPizza.map((pizza) => (
            <div key={pizza.id}>
              id: {pizza.id}
              <div>name: {pizza.name}</div>
              <div>amount: {pizza.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
