import React from 'react';

export default function PizzaList(props) {
  return (
    <div className="pizza-list">
      {props.pizzas.map((pizza) => (
        <div key={pizza.id} className="pizza">
          <h2>{pizza.name}</h2>
          <p>Price: {pizza.price}</p>
          <p>Allergens: {pizza.allergens.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}