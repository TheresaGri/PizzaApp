import { useEffect, useRef, useState } from 'react';
import './App.css';
import { getPizzaByNamePriceAndAllergen } from './data/data';
import Header from './components/Header';
import Filter from './components/Filter';
import BannerText from './components/BannerText';
import Select from './components/Select';
import Button from './components/Button';
import LabelAndInput from './components/LabelAndInput';
import Popper from './components/Popper';
import { formLabels } from './data/formLabels';
import { maxPriceList } from './data/maxPriceList';
import { allergensList } from './data/allergensList';
import Sort from './components/Sort';

function App() {
	const refMenu = useRef(null);
	const refHome = useRef(null);
	const [name, setName] = useState('');
	const [maxPrice, setMaxPrice] = useState(30);
	const [allergen, setAllergen] = useState('Nuts');
	const [filteredPizza, setFilteredPizza] = useState([]);
	const [orders, setOrders] = useState([]);
	const [orderTotal, setOrderTotal] = useState(0);
	const [orderAmount, setOrderAmount] = useState(0);
	const [sort, setSort] = useState('');
	const [form, setForm] = useState({
		name: '',
		email: '',
		city: '',
		street: '',
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
		async function loadFilteredPizzas(name, maxPrice, allergen, sort) {
			let data = await getPizzaByNamePriceAndAllergen(
				name,
				maxPrice,
				allergen,
				sort
			);
			setFilteredPizza(data);
		}
		loadFilteredPizzas(name, maxPrice, allergen, sort);
	}, [name, maxPrice, allergen, sort]);

	function filterPizzaID(orders, id, value) {
		for (let i = 0; i < orders.length; i++) {
			if (orders[i][id] === value) {
				orders.splice(i, 1);
				return orders;
			}
		}
		return orders;
	}

	function findPizza(array, key, value) {
		for (let i = 0; i < array.length; i++) {
			if (array[i][key] === value) {
				return true;
			}
		}
		return false;
	}

	function addOrder(pizza) {
		setOrders([
			...orders,
			{
				id: pizza.id,
				name: pizza.name,
				amount: 1,
				price: pizza.price,
			},
		]);
		setOrderTotal(orderTotal + pizza.price);
		setOrderAmount(orderAmount + 1);
	}

	function deleteOrder(pizza) {
		if (findPizza(orders, 'id', pizza.id)) {
			setOrders(filterPizzaID(orders, 'id', pizza.id));
			setOrderTotal(orderTotal - pizza.price);
			setOrderAmount(orderAmount - 1);
		} else {
			return;
		}
	}

	const combineOrderAmount = orders.reduce((acc, curr) => {
		const existingOrderIndex = acc.findIndex(
			(combinedOrder) => combinedOrder.name === curr.name
		);

		if (existingOrderIndex !== -1) {
			acc[existingOrderIndex].amount += curr.amount;

			if (acc[existingOrderIndex].amount === 0) {
				acc.splice(existingOrderIndex, 1);
			}
		} else {
			acc.push({ ...curr });
		}

		return acc;
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		const date = new Date();
		let orderedPizzasByIdAndAmount = combineOrderAmount.map((pizza) => {
			return { id: pizza.id, amount: pizza.amount };
		});

		const dataOfOrder = {
			completed: false,
			pizzas: orderedPizzasByIdAndAmount,
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
		};

		fetch('http://localhost:3000/api/orders', {
			method: 'POST',
			body: JSON.stringify(dataOfOrder),
			headers: { 'Content-Type': 'application/json' },
		});
	};

	return (
		<div className='homepage'>
			<div id='banner' ref={refHome}>
				<Header
					value={orderAmount}
					onclick={() =>
						refMenu.current?.scrollIntoView({ behavior: 'smooth' })
					}
					onPress={() =>
						refHome.current?.scrollIntoView({ behavior: 'smooth' })
					}
				>
					<Popper>
						<div id='active-order'>
							<h1 id='order-title'>Your order</h1>
							<hr id='order-line'></hr>
							<div id='order-list'>
								{combineOrderAmount.map((order) =>
									order.amount > 0 ? (
										<div className='order-item' key={order.name}>
											<div className='item-name'>{order.name}</div>
											<div className='item-price'>
												€{order.price * order.amount}.00
											</div>
											<span className='item-amount'>
												Amount: {order.amount}
											</span>
										</div>
									) : null
								)}
							</div>
							<div id='order-total'>
								<span>Total: </span>
								<span>€{orderTotal}.00</span>
							</div>
						</div>
					</Popper>
				</Header>
				<BannerText></BannerText>
			</div>
			<div id='menu' ref={refMenu}>
				{' '}
				<h1 id='menu-title'>Menu</h1>
				<div id='filter-input'>
					<Sort
						onSortName={() => setSort('name')}
						onSortPrice={() => setSort('price')}
					></Sort>
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
							<div className='pizza-price'>€{pizza.price}.00</div>
							<div className='order-buttons'>
								<Button onClick={() => addOrder(pizza)}>+</Button>
								<Button onClick={() => deleteOrder(pizza)}>🗑</Button>
							</div>
						</div>
					))}
				</div>
			</div>
			<div id='order-checkout'>
				<form id='form' onSubmit={handleSubmit}>
					{formLabels.map((item) => (
						<LabelAndInput
							key={item}
							label={item}
							id={item}
							value={form.item}
							handleChange={submitChange}
						></LabelAndInput>
					))}
					<button type='submit' id='submitButton'>
						Submit
					</button>
				</form>
				<div id='active-order'>
					<h1>Order:</h1>
					<ul>
						{combineOrderAmount.map((order) =>
							order.amount > 0 ? (
								<li key={order.name}>
									{order.name}: {order.amount}
								</li>
							) : null
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default App;
