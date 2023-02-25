export async function getPizzaByNamePriceAndAllergen(
  name,
  maxPrice,
  allergen,
  sort
) {
  const url = `https://young-berry-chiller.glitch.me/api/pizzas?max-price=${maxPrice}&name=${name}&avoid-allergen-by-name=${allergen}&sort-asc=${sort}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getOrders() {
  const url = "https://young-berry-chiller.glitch.me/api/orders";
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
