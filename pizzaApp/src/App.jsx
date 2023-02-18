import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header';
import banner from './assets/banner.webp';

async function getPizzas() {
	const url = 'http://localhost:3000/api/pizzas';
	const res = await fetch(url);
	const data = await res.json();
	return data;
}

function App() {
	const [pizzas, setPizzas] = useState([]);

	useEffect(() => {
		async function showPizzas() {
			let data = await getPizzas();
			setPizzas(data);
		}
		console.log(pizzas);
	}, [pizzas]);
	return (
		<>
			<div className='homepage'>
				{pizzas.map((pizza) => (
					<li>{pizza.name}</li>
				))}
				<Header> </Header>
				<img id='restaurant-banner' src={banner}></img>
			</div>
		</>
	);
}

export default App;
