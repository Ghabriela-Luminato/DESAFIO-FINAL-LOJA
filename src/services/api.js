const BASE_URL = "https://api.escuelajs.co/api/v1";

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/categories`);
  return res.json();
}

export async function getProductsByCategory(id) {
  const res = await fetch(`${BASE_URL}/categories/${id}/products`);
  return res.json();
}