import { useEffect, useRef, useState } from 'react';
import './App.css';
import { getPizzaById, getPizzaByNamePriceAndAllergen } from './data/data';
import Header from './components/Header';
import Filter from './components/Filter';
import BannerText from './components/BannerText';
import Select from './components/Select';
import Button from './components/Button';

const maxPriceList = [
	{ name: 'No limit', value: 0 },
	{ name: '5€', value: 5 },
	{ name: '10€', value: 10 },
	{ name: '15€', value: 15 },
	{ name: '20€', value: 20 },
];
const allergensList = [
	{ name: 'No Allergen', value: 0 },
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
	{ name: 'All Pizzas', value: 0 },
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

	const [orderNumber, setOrderNumber] = useState(0);
	const [order, setOrder] = useState([]);
	const [name, setName] = useState('');
	const [maxPrice, setMaxPrice] = useState(20);
	const [allergen, setAllergen] = useState('');
	const [filteredPizza, setFilteredPizza] = useState([]);
	const [idOfOrder, setidOfOrder] = useState(0);
	const [orderedPizza, setOrderedPizza] = useState([]);
	const [deleteOrAdd, setDeleteOrAdd] = useState('');

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

	function filterPizzasByMaxPrice(event) {
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
				{' '}
				<h1 id='menu-title'>Menu</h1>
				<div id='filter-input'>
					<Filter
						value={name}
						placeholder={'Search pizzas by name'}
						onChange={filterPizzasByName}
					></Filter>
					{/* <Select
						select={maxPrice}
						onChange={(event) => setMaxPrice(event.target.value)}
					></Select> */}
					<Filter
						value={allergen}
						placeholder={'Search pizzas by allergen'}
						onChange={filterPizzasByAllergen}
					></Filter>
				</div>
				{filteredPizza.map((pizza) => (
					<div class='pizza-entry' key={pizza.id}>
						<div class='pizza-name'>{pizza.name}</div>
						<div class='pizza-price'>Є{pizza.price - 1}.99</div>
						<Button
							onClick={() => {
								updateOrder(pizza);
							}}
						>
							Add order
						</Button>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
