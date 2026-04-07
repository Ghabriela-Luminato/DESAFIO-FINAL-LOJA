import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function DailyDeals({ products }) {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    if (!products || products.length === 0) return;

    const categorias = [
      "smartphones",
      "laptops",
      "fragrances",
      "skincare",
      "home-decoration"
    ];

    let selecionados = [];

    
    categorias.forEach((cat) => {
      const lista = products.filter(
        (p) =>
          p.category &&
          p.category.toLowerCase().trim() === cat
      );

      if (lista.length > 0) {
        const random =
          lista[Math.floor(Math.random() * lista.length)];

        selecionados.push(random);
      }
    });

    
    const final = selecionados
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    setDeals(final);

  }, [products]);

  return (
    <div className="deals-container">

      <div className="deals-header">
        <h2 className="deals-title">
          Ofertas do dia para aproveitar 🔥
        </h2>
      </div>

      <div className="products-grid">
        {deals.length > 0 ? (
          deals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>
            Carregando ofertas...
          </p>
        )}
      </div>

    </div>
  );
}

export default DailyDeals;