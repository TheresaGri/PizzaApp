export async function getPizzaByNamePriceAndAllergen(
  name,
  maxPrice,
  allergen,
  sort
) {
  const url = `http://localhost:3000/api/pizzas?max-price=${maxPrice}&name=${name}&avoid-allergen-by-name=${allergen}&sort-asc=${sort}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getOrders() {
  const url = "http://localhost:3000/api/orders";
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
