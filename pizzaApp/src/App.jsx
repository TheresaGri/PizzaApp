import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header';
import banner from './assets/pizza-banner.jpeg';

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
	}, []);
	return (
		<>
			<div className='homepage'>
				{pizzas.map((pizza) => (
					<li>{pizza.name}</li>
				))}
				<div id='banner'>
					<Header> </Header>
					<div id='header-text'>
						<h3 id='header-intro'>
							When the moon hits your eye like a big pizza pie...
						</h3>
						<h1 id='header-tagline'>That's Amore Pizza</h1>
						<h2 id='reserve-table'>Reserve Table</h2>
						<h2 id='browse-menu'>Browse Menu</h2>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
