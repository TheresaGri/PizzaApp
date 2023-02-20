import { useEffect, useRef, useState } from 'react';
import './App.css';
import { getPizzaByNamePriceAndAllergen } from './data/data';
import Header from './components/Header';
import Filter from './components/Filter';
import BannerText from './components/BannerText';
import Select from './components/Select';
import Button from './components/Button';

function App() {
	const divRef = useRef(null);

	const [orderNumber, setOrderNumber] = useState(0);
	const [order, setOrder] = useState([]);
	const [name, setName] = useState('');
	const [maxPrice, setMaxPrice] = useState(20);
	const [allergen, setAllergen] = useState('');
	const [filteredPizza, setFilteredPizza] = useState([]);

	function filterPizzasByName(event) {
		setName(event.target.value);
	}

	function filterPizzasByAllergen(event) {
		setAllergen(event.target.value);
	}

	function updateOrder(pizza) {
		setOrder([
			...order,
			{
				id: pizza.id,
				name: pizza.name,
				amount: 1,
			},
		]);

		setOrderNumber(orderNumber + 1);
	}

	useEffect(() => {
		async function loadFilteredPizzas(name, maxPrice, allergen) {
			let data = await getPizzaByNamePriceAndAllergen(name, maxPrice, allergen);
			setFilteredPizza(data);
		}
		loadFilteredPizzas(name, maxPrice, allergen);
	}, [name, maxPrice, allergen]);

	return (
		<div className='homepage'>
			<div id='banner'>
				<Header
					value={orderNumber}
					onclick={() => divRef.current?.scrollIntoView({ behavior: 'smooth' })}
				></Header>
				<BannerText></BannerText>
			</div>

			<div id='menu' ref={divRef}>
				<h1 id='menu-title'>Menu</h1>
				<div id='filter-input'>
					<Filter
						value={name}
						placeholder={'Search pizzas by name'}
						onChange={filterPizzasByName}
					></Filter>
					<Select
						select={maxPrice}
						onChange={(event) => setMaxPrice(event.target.value)}
					></Select>
					<Filter
						value={allergen}
						placeholder={'Search pizzas by allergen'}
						onChange={filterPizzasByAllergen}
					></Filter>
				</div>
				<div id='pizza-list'>
					{filteredPizza.map((pizza) => (
						<div className='pizza-entry' key={pizza.id}>
							<div className='pizza-info'>
								<span className='pizza-name'>{pizza.name}</span>
								<span className='pizza-ingredients'>
									{pizza.ingredients.join(', ')}
								</span>
							</div>
							<div className='pizza-price'>€{pizza.price - 1}.99</div>
							<Button
								className='add-order-button'
								onClick={() => updateOrder(pizza)}
							>
								Add order
							</Button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
