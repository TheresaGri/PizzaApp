import { useEffect, useRef, useState } from 'react';
import './App.css';
import { getPizzaById, getPizzaByNamePriceAndAllergen } from './data/data';
import Header from './components/Header';
import Filter from './components/Filter';
import BannerText from './components/BannerText';
import Select from './components/Select';
import Button from './components/Button';
import LabelAndInput from './components/LabelAndInput';

const maxPriceList = [
	{ name: 'No limit', value: 30 },
	{ name: '5€', value: 5 },
	{ name: '10€', value: 10 },
	{ name: '15€', value: 15 },
	{ name: '20€', value: 20 },
];
const allergensList = [
	{ name: 'No Allergen', value: 'Nuts' },
	{ name: 'Gluten', value: 'Gluten' },
	{ name: 'Crustaceans', value: 'GluCrustaceansten' },
	{ name: 'Egg', value: 'Egg' },
	{ name: 'Fish', value: 'Fish' },
	{ name: 'Peanut', value: 'Peanut' },
	{ name: 'Soy', value: 'Soy' },
	{ name: 'Lactose', value: 'Lactose' },
	{ name: 'Nuts', value: 'Nuts' },
	{ name: 'Celery', value: 'Celery' },
	{ name: 'Mustard', value: 'Mustard' },
	{ name: 'Sesame', value: 'Sesame' },
	{ name: 'Sulphites', value: 'Sulphites' },
	{ name: 'Lupines', value: 'Lupines' },
	{ name: 'Molluscs', value: 'Molluscs' },
];
const pizzaNamesList = [
	{ name: 'All Pizzas', value: '' },
	{ name: 'Margherita', value: 'Margherita' },
	{ name: 'Salami', value: 'Salami' },
	{ name: 'Marinara', value: 'Marinara' },
	{ name: 'Funghi', value: 'Funghi' },
	{ name: 'Frutti di Mare', value: 'Frutti di Mare' },
	{ name: 'Diavolo', value: 'Diavolo' },
	{ name: 'Cardinale', value: 'Cardinale' },
];

function App() {
	const divRef = useRef(null);
	const [name, setName] = useState('');
	const [maxPrice, setMaxPrice] = useState(30);
	const [allergen, setAllergen] = useState('Nuts');
	const [filteredPizza, setFilteredPizza] = useState([]);
	const [idOfOrder, setidOfOrder] = useState(0);
	const [orderedPizza, setOrderedPizza] = useState([]);
	const [deleteOrAdd, setDeleteOrAdd] = useState('');
	const [form, setForm] = useState({
		name: '',
		email: '',
		adress: { city: '', street: '' },
	});

	const submitChange = (event) => {
		setForm({
			...form,
			[event.target.id]: event.target.value,
		});
	};

	function filterPizzasByName(event) {
		setName(event.target.value);
	}

	function filterPizzasByAllergen(event) {
		let value = event.value;
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
		setDeleteOrAdd('add');
	}

	function deleteOrder(id) {
		setidOfOrder(id);
		setDeleteOrAdd('delete');
	}

	useEffect(() => {
		async function loadPizzaById(id) {
			let data = await getPizzaById(id);
			let dataOfOrderedPizza = [{ id: data.id, amount: 1, name: data.name }];
			orderedPizza.map((order) => {
				if (order.id === dataOfOrderedPizza[0].id && deleteOrAdd === 'add') {
					order.amount += 1;
					dataOfOrderedPizza = [];
				} else if (
					order.id === dataOfOrderedPizza[0].id &&
					deleteOrAdd === 'delete'
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

	const handleSubmit = (event) => {
		event.preventDefault();

		alert(form.name + ' ' + form.email + ' ' + form.city + ' ' + form.street);
	};
	console.log(form);
	const date = new Date();

	const dataOfOrder = {
		pizzas: orderedPizza,
		date: {
			year: date.getFullYear(),
			month: date.getMonth() + 1,
			day: date.getDate(),
			hours: date.getHours(),
			minutes: date.getMinutes(),
		},
		customer: {
			form,
		},
	};

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
						placeholer={'Search pizza by name'}
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
				<div id='pizza-list'>
					{filteredPizza.map((pizza) => (
						<div className='pizza-entry' key={pizza.id}>
							<div className='pizza-info'>
								<div className='pizza-name'>{pizza.name}</div>
								<div className='pizza-ingredients'>
									{pizza.ingredients.join(', ')}
								</div>
							</div>
							<div className='pizza-price'>€{pizza.price - 0.01}</div>
							<div className='order-buttons'>
								<Button onClick={() => addToOrder(pizza.id)}>+</Button>
								<Button onClick={() => deleteOrder(pizza.id)}>🗑</Button>
							</div>
						</div>
					))}
				</div>
			</div>
			<form id='form' onSubmit={handleSubmit}>
				<LabelAndInput
					label='name'
					id='name'
					value={form.name}
					handleChange={submitChange}
				>
					Name:{' '}
				</LabelAndInput>
				<LabelAndInput
					label='email'
					id='email'
					value={form.email}
					handleChange={submitChange}
				>
					Email:{' '}
				</LabelAndInput>
				<LabelAndInput
					label='city'
					id='city'
					value={form.city}
					handleChange={submitChange}
				>
					City:{' '}
				</LabelAndInput>
				<LabelAndInput
					label='street'
					id='street'
					value={form.street}
					handleChange={submitChange}
				>
					Street:{' '}
				</LabelAndInput>
				<button type='submit' id='submitButton'>
					Submit
				</button>
			</form>
			<div>
				<h1>Order:</h1>
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
