import { useEffect, useRef, useState } from 'react';
import './App.css';
import { getPizzaByNamePriceAndAllergen } from './data/data';
import Header from './components/Header';
import Filter from './components/Filter';
import BannerText from './components/BannerText';

function App() {
	const divRef = useRef(null);

	const [name, setName] = useState('');
	const [maxPrice, setMaxPrice] = useState(20);
	const [allergen, setAllergen] = useState('');
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
		<div className='homepage'>
			<div id='banner'>
				<Header
					onclick={() => divRef.current?.scrollIntoView({ behavior: 'smooth' })}
				></Header>
				<BannerText></BannerText>
			</div>

			<div id='menu' ref={divRef}>
				{' '}
				<h1 id='menu-title'>Menu</h1>
				<div id='filter-input'>
					<Filter
						value={name}
						placeholder={'Search pizzas by name'}
						onChange={filterPizzasByName}
					></Filter>
					<Filter
						value={maxPrice}
						placeholder={'Search pizzas by price'}
						onChange={filterPizzasByPrice}
					></Filter>
					<Filter
						value={allergen}
						placeholder={'Search pizzas by allergen'}
						onChange={filterPizzasByAllergen}
					></Filter>
				</div>
				{filteredPizza.map((pizza) => (
					<div class='pizza-entry' key={pizza.id}>
						<div class='pizza-name'>{pizza.name}</div>
						<div class='pizza-price'>price: {pizza.price}</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
