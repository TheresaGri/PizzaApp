import "./App.css";
import { useEffect, useState } from "react";
import PasswordField from "./components/PasswordField";
import LabelAndInput from "./components/LabelAndInput";
import Button from "./components/Button";
import { getOrders } from "../../pizzaApp/src/data/data";
import Selection from "./components/Selection";
import { getAllergens } from "./data/data";

function App() {
  const [classNameOfPasswordField, setClassNameOfPasswordField] = useState(
    "PasswordField_displayNone"
  );
  const [ordersData, setOrdersData] = useState([]);
  const [formOfPizza, setFormOfPizza] = useState({
    name: "",
    price: "",
  });
  const [classNameOfOrders, setClassNameOfOrders] =
    useState("Orders_displayNone");

  const [chosenAllergen, setChosenAllergen] = useState("");
  const [allergensList, setAllergensList] = useState([]);
  const [chosenAllergensArray, setChosenAllergensArray] = useState([]);
  const [chosenIngredient, setChosenIngredient] = useState("");
  const [ChosenIngredientArray, setChosenIngredientArray] = useState([]);

  const ingredientList = [
    "tomato sauce",
    "cheese",
    "oregano",
    "salami",
    "garlic",
    "mushrooms",
    "shrimp",
    "mussel",
    "tuna",
    "calamari",
    "ham",
    "capers",
    "anchovies",
    "hot pepperoni",
  ];

  const changePizzaData = (event) => {
    setFormOfPizza({
      ...formOfPizza,
      [event.target.id]: event.target.value,
    });
  };

  const saveAllergenData = (event) => {
    setChosenAllergen(event.target.value);
  };

  useEffect(() => {
    setChosenAllergensArray([...chosenAllergensArray, chosenAllergen]);
  }, [chosenAllergen]);

  const saveIngredientsData = (event) => {
    setChosenIngredient(event.target.value);
  };

  useEffect(() => {
    setChosenIngredientArray([...ChosenIngredientArray, chosenIngredient]);
  }, [chosenIngredient]);

  useEffect(() => {
    async function loadAllergens() {
      let data = await getAllergens();
      setAllergensList(data);
    }
    loadAllergens();
  }, []);

  useEffect(() => {
    async function loadOrders() {
      let data = await getOrders();
      setOrdersData(data);
    }
    loadOrders();
  }, []);

  const createNewPizza = (event) => {
    event.preventDefault();
    chosenAllergensArray.splice(0, 1);
    ChosenIngredientArray.splice(0, 1);
    let uniqueAllergensList = [...new Set(chosenAllergensArray)];
    let uniqueIngredientsList = [...new Set(ChosenIngredientArray)];

    const newPizza = {
      name: formOfPizza.name,
      allergens: uniqueAllergensList,
      ingredients: uniqueIngredientsList,
    };

    fetch("http://localhost:3000/api/pizzas", {
      method: "POST",
      body: JSON.stringify(newPizza),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <div className="App">
      <div>
        <div className="ordersForOwner">
          <Button
            onClick={() =>
              setClassNameOfPasswordField(".PasswordField_displayBlock")
            }
          >
            owner
          </Button>
          <PasswordField
            className={classNameOfPasswordField}
            pressEnter={(event) => {
              if (event.key === "Enter" && event.target.value === "hello") {
                setClassNameOfOrders("Orders_displayBlock");
              }
            }}
          ></PasswordField>
          <div className={classNameOfOrders}>
            <ol>
              {ordersData.map((order) => (
                <li>
                  <div>Name: {order.customer.name}</div>
                  <div>
                    <div>City: {order.customer.address.city}</div>
                   <div>Street: {order.customer.address.street}</div>
                  </div>

                </li>
              ))}
            </ol>
          </div>
          <form onSubmit={createNewPizza} className={classNameOfOrders}>
            <LabelAndInput
              label="name"
              id="name"
              value={formOfPizza.name}
              handleChange={changePizzaData}
            ></LabelAndInput>
            <LabelAndInput
              label="price"
              id="price"
              value={formOfPizza.price}
              handleChange={changePizzaData}
            ></LabelAndInput>
            <Selection
              data={allergensList}
              select={chosenAllergen}
              onChange={saveAllergenData}
            ></Selection>
            <select
              className="selectionIngredients"
              value={chosenIngredient}
              onChange={(event) => saveIngredientsData(event)}
            >
              {ingredientList.map((allergen) => (
                <option value={allergen}>{allergen}</option>
              ))}
            </select>
            <button type="submit" id="addPizzaButton">
              Add Pizza
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
