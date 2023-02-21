/* export async function getPizzas() {
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
} */

export async function getPizzaByNamePriceAndAllergen(name, maxPrice, allergen) {
  const url = `http://localhost:3000/api/pizzas?max-price=${maxPrice}&name=${name}&avoid-allergen-by-name=${allergen}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getPizzaById(id) {
  const url = `http://localhost:3000/api/pizzas/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
