import './App.css';
import { useEffect, useState } from "react";
import PasswordField from './components/PasswordField';
import LabelAndInput from './components/LabelAndInput';
import Button from './components/Button';
import { getOrders } from '../../pizzaApp/src/data/data';


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

    const changePizzaData = (event) => {
      setFormOfPizza({
        ...formOfPizza,
        [event.target.id]: event.target.value,
      });
    };

    useEffect(() => {
      async function loadOrders() {
        let data = await getOrders();
        setOrdersData(data);
      }
      loadOrders();
    }, []);

    const createNewPizza = (event) => {
      event.preventDefault();
  
      const newPizza = {
        name: formOfPizza.name,
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
              {ordersData.map((order) => (
                <li>
                  {order.id}
                  {order.customer.name}
                  {order.completed}
                </li>
              ))}
            </div>
            <form onSubmit={createNewPizza} className = {classNameOfOrders}>
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
              <button type="submit" id="addPizzaButton">
                Add Pizza
              </button>
            </form>
          </div>
        </div>
    </div>
  )
}

export default App
