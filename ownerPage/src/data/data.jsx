export async function getOrders() {
  const url = "https://young-berry-chiller.glitch.me/api/orders";
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getAllergens() {
  const url = "https://young-berry-chiller.glitch.me/api/allergens";
  const res = await fetch(url);
  const data = await res.json();
  return data;

}