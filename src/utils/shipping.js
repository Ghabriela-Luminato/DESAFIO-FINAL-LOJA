export function calculateShipping({ cep, state, subtotal, method }) {
  // MG = frete grátis
  if (state === "MG") {
    return {
      price: 0,
      label: "Frete grátis (MG)"
    };
  }

  // base de valores (simulação mercado)
  const basePrices = {
    correios: 18.9,
    loggi: 25.9
  };

  let price = basePrices[method] || 18.9;

  // regra de valor (quanto mais caro carrinho, mais barato frete)
  if (subtotal > 200) price -= 5;
  if (subtotal > 400) price -= 8;

  return {
    price: Math.max(price, 0),
    label: method === "loggi" ? "Entrega rápida (Loggi)" : "Correios padrão"
  };
}