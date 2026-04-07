const BASE_URL = "https://dummyjson.com";

export async function getProducts() {
  try {
 
    const res = await fetch(`${BASE_URL}/products?limit=300`);
    const data = await res.json();

   
    const skincareRes = await fetch(`${BASE_URL}/products/category/skincare`);
    const skincareData = await skincareRes.json();


    const allProducts = [
      ...data.products,
      ...skincareData.products,
    ];

  
    const uniqueProducts = Array.from(
      new Map(allProducts.map(p => [p.id, p])).values()
    );

    return uniqueProducts;

  } catch (err) {
    console.error("Erro API:", err);
    return [];
  }
}

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
}
