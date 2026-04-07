const BASE_URL = "https://dummyjson.com";


export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  const data = await res.json();
  return data.products; 
}


export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
}