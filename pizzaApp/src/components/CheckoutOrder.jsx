import "./CheckoutOrder.css";

export default function CheckoutOrder(props) {
  let combineOrderAmount = props.array;
  let orderTotal = props.total;
  return (
    <div id="checkout-order">
            <h2 id="checkout-order-title">Order:</h2>
            <div>
              {combineOrderAmount.map((order) =>
                order.amount > 0 ? (
                  <div className="order-item" key={order.name}>
                    <div className="item-name">{order.name}</div>
                    <div className="item-price">
                      €{order.price * order.amount}.00
                    </div>
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