import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function DailyDeals({ products }) {
  const [deals, setDeals] = useState([]);

  function getRandomProducts(list, count = 4) {
    const shuffled = [...list].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, list.length));
  }

  useEffect(() => {
    if (!products || products.length === 0) return;

    const saved = localStorage.getItem("dailyDeals");
    const savedDate = localStorage.getItem("dailyDealsDate");

    const today = new Date().toDateString();

  
    if (saved && savedDate === today) {
      try {
        setDeals(JSON.parse(saved));
        return;
      } catch {
        localStorage.removeItem("dailyDeals");
      }
    }


    const validProducts = products.filter(
      (p) => p && p.id && p.title && p.price
    );

    const newDeals = getRandomProducts(validProducts, 4);

    setDeals(newDeals);

    localStorage.setItem("dailyDeals", JSON.stringify(newDeals));
    localStorage.setItem("dailyDealsDate", today);

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