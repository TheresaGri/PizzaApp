import { useEffect, useRef, useState } from "react";
import "./App.css";
import { getPizzaByNamePriceAndAllergen } from "./data/data";
import Header from "./components/Header";
import Filter from "./components/Filter";
import BannerText from "./components/BannerText";
import Select from "./components/Select";
import Button from "./components/Button";
import LabelAndInput from "./components/LabelAndInput";

const maxPriceList = [
  { name: "No limit", value: 30 },
  { name: "5€", value: 5 },
  { name: "10€", value: 10 },
  { name: "15€", value: 15 },
  { name: "20€", value: 20 },
];
const allergensList = [
  { name: "No Allergen", value: "Nuts" },
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

const formLabels = ["name", "email", "city", "street"];

function App() {
  const divRef = useRef(null);
  const [name, setName] = useState("");
  const [maxPrice, setMaxPrice] = useState(30);
  const [allergen, setAllergen] = useState("Nuts");
  const [filteredPizza, setFilteredPizza] = useState([]);
  const [orderedPizza, setOrderedPizza] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    street: "",
  });

  const submitChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

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
    const addedPizza = filteredPizza.filter((pizza) => pizza.id === id);
    let newOrder = [{ id: id, amount: 1, name: addedPizza[0].name }];
    orderedPizza.map((order) => {
      if (order.id === newOrder[0].id) {
        order.amount += 1;
        newOrder = [];
      }
    });
    setOrderedPizza([...orderedPizza, ...newOrder]);
  }

  function deleteOrder(id) {
    const deletedPizza = filteredPizza.filter((pizza) => pizza.id === id);
    let deletedOrder = [{ id: id, amount: 0, name: deletedPizza[0].name }];
    orderedPizza.map((pizza) => {
      console.log(pizza.id);

      if (pizza.id === deletedOrder[0].id) {
        if (pizza.amount > 0) {
          pizza.amount -= 1;
          deletedOrder = [];
        } else if (pizza.amount === 0) {
          pizza.amount = 0;
        }
      }
    });
    setOrderedPizza([...orderedPizza, ...deletedOrder]);
  }

  console.log(orderedPizza);

  const handleSubmit = (event) => {
    event.preventDefault();
    const date = new Date();
    let ordersOfPizza = orderedPizza.filter((pizza) => pizza.amount !== 0);
    ordersOfPizza = ordersOfPizza.map((pizza) => {
      return { id: pizza.id, amount: pizza.amount };
    });

    const dataOfOrder = {
      pizzas: ordersOfPizza,
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
      },
      customer: {
        name: form.name,
        email: form.email,
        adress: {
          city: form.city,
          street: form.street,
        },
      },
      completed: false,
    };

    fetch("http://localhost:3000/api/orders", {
      method: "POST",
      body: JSON.stringify(dataOfOrder),
      headers: { "Content-Type": "application/json" },
    });
  };

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
            placeholer={"Search pizza by name"}
            onChange={(event) => setName(event.target.value)}
          ></Filter>
          <Select
            array={maxPriceList}
            select={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
          ></Select>
          <Select
            array={allergensList}
            select={allergen}
            onChange={filterPizzasByAllergen}
          ></Select>
        </div>
        <div id="pizza-list">
          {filteredPizza.map((pizza) => (
            <div className="pizza-entry" key={pizza.id}>
              <div className="pizza-info">
                <div className="pizza-name">{pizza.name}</div>
                <div className="pizza-ingredients">
                  {pizza.ingredients.join(", ")}
                </div>
              </div>
              <div className="pizza-price">€{pizza.price - 0.01}</div>
              <div className="order-buttons">
                <Button onClick={() => addToOrder(pizza.id)}>+</Button>
                <Button onClick={() => deleteOrder(pizza.id)}>🗑</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <form id="form" onSubmit={handleSubmit}>
        {formLabels.map((item) => (
          <LabelAndInput
            label={item}
            id={item}
            value={form.item}
            handleChange={submitChange}
          ></LabelAndInput>
        ))}
        <button type="submit" id="submitButton">
          Submit
        </button>
      </form>
      <div>
        <h1>Order:</h1>
        <div>
          {orderedPizza.map((pizza) => {
            if (pizza.amount !== 0) {
              return (
                <div key={pizza.id}>
                  id: {pizza.id}
                  <div>name: {pizza.name}</div>
                  <div>amount: {pizza.amount}</div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
