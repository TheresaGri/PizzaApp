export async function getPizzas() {
  const url = "http://localhost:3000/api/pizzas";
  const res = await fetch(url);
  const data = await res.json();
  return data;
}