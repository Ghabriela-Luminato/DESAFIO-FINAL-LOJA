const BASE_URL = "https://dummyjson.com";

// 🔹 TODOS produtos
export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  const data = await res.json();
  return data.products; // ⚠️ MUITO IMPORTANTE
}

// 🔹 PRODUTO POR ID
export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
}