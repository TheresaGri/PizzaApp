export async function getPizzaByNamePriceAndAllergen(
	name,
	maxPrice,
	allergen,
	sort
) {
	const url = `http://localhost:4000/api/pizzas?max-price=${maxPrice}&name=${name}&avoid-allergen-by-name=${allergen}&sort-asc=${sort}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getOrders() {
	const url = 'http://localhost:4000/api/orders';
	const res = await fetch(url);
	const data = await res.json();
	return data;
}
