import React, { useState } from "react";

export default function OrdersList(props) {
  const [showCompleted, setShowCompleted] = useState(null);
  const { orders, onCompletedChange } = props;
  const completedOrders = orders.filter((order) => order.completed);
  const incompleteOrders = orders.filter((order) => !order.completed);
  const allOrders = [...incompleteOrders, ...completedOrders];
  const ordersToDisplay =
    showCompleted === true
      ? completedOrders
      : showCompleted === false
      ? incompleteOrders
      : allOrders;
  return (
    <div>
      <div>
        <button onClick={() => setShowCompleted(false)}>
          Show incomplete orders
        </button>
        <button onClick={() => setShowCompleted(true)}>
          Show completed orders
        </button>
        <button onClick={() => setShowCompleted(null)}>Show all orders</button>
      </div>
      {ordersToDisplay.map((order) => (
        <div key={order.id}>
          <h3>Order {order.id}</h3>
          <p>Status: {order.completed ? "Completed" : "Incomplete"}</p>
          <p>Customer name: {order.customer.name}</p>
          <p>Customer email: {order.customer.email}</p>
          {!order.completed && (
            <label>
              Completed:
              <input
                type="checkbox"
                checked={order.completed}
                onChange={() => onCompletedChange(order.id)}
              />
            </label>
          )}
        </div>
      ))}
    </div>
  );
}