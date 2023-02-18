
import { useEffect, useState } from "react";
import { getPizzas } from "./data/data";
import "./App.css";
import Header from './components/header';
import banner from './assets/banner.webp';


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
    <div className="homepage">
      {pizzas.map((pizza) => (
        <li>{pizza.name}</li>
      ))}
      <Header> </Header>
			<img id='restaurant-banner' src={banner}></img>
    </div>
  );
}

export default App;
