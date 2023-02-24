import "./ActiveOrder.css";

export default function ActiveOrder(props) {
  let combineOrderAmount = props.array;
  let orderTotal = props.total;
  return (
    <div id="active-order">
      <h1 id="order-title">Your order</h1>
      <hr id="order-line"></hr>
      <div id="order-list">
        {combineOrderAmount.map((order) =>
          order.amount > 0 ? (
            <div className="order-item" key={order.name}>
              <div className="item-name">{order.name}</div>
              <div className="item-price">€{order.price * order.amount}.00</div>
              <span className="item-amount">Amount: {order.amount}</span>
            </div>
          ) : null
        )}
      </div>
      <div id="order-total">
        <span>Total: </span>
        <span>€{orderTotal}.00</span>
      </div>
    </div>
  );
}
