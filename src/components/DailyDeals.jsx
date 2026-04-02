import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function DailyDeals({ products }) {
  const [deals, setDeals] = useState([]);

  function getRandomProducts(list, count = 4) {
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  useEffect(() => {
    if (products.length === 0) return;

    const saved = localStorage.getItem("dailyDeals");
    const savedDate = localStorage.getItem("dailyDealsDate");

    const today = new Date().toDateString();


    if (saved && savedDate === today) {
      setDeals(JSON.parse(saved));
      return;
    }

    const newDeals = getRandomProducts(products, 4);
    setDeals(newDeals);

    localStorage.setItem("dailyDeals", JSON.stringify(newDeals));
    localStorage.setItem("dailyDealsDate", today);

  }, [products]);

  return (
    <div className="deals-container">
      
      <div className="deals-header">
        <h2 className="deals-title">Ofertas do dia para aproveitar 🔥</h2>
      </div>

      <div className="products-grid">
        {deals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
}

export default DailyDeals;