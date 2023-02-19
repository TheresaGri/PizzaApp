export async function getPizzas() {
  const url = "http://localhost:3000/api/pizzas";
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getPizzaByName(name) {
  const url = `http://localhost:3000/api/pizzas?name=${name}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getPizzaByPrice(price) {
  const url = `http://localhost:3000/api/pizzas?max-price=${price}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}