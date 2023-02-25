import './ActiveOrder.css';

export default function ActiveOrder(props) {
	let combineOrderAmount = props.array;
	let orderTotal = props.total;
	return (
		<div id='active-order'>
			<h1 id='active-order-title'>Your order</h1>
			<hr id='active-order-line'></hr>
			<div id='active-order-list'>
				{combineOrderAmount.map((order) =>
					order.amount > 0 ? (
						<div className='active-order-item' key={order.name}>
							<div className='active-item-name'>{order.name}</div>
							<div className='active-item-price'>
								€{order.price * order.amount}.00
							</div>
							<span className='active-item-amount'>Amount: {order.amount}</span>
						</div>
					) : null
				)}
			</div>
			<div id='active-order-total'>
				<span>Total: </span>
				<span>€{orderTotal}.00</span>
			</div>
		</div>
	);
}
