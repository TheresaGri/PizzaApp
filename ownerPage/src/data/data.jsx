export async function getOrders() {
  const url = "http://localhost:3000/api/orders";
  const res = await fetch(url);
  const data = await res.json();
  return data;
}