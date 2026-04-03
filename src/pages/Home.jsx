import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";
import { getProducts } from "../services/api"; 

function Home({ search }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  const location = useLocation();


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("cat");

    if (cat) {
      setCategory(decodeURIComponent(cat));
    } else {
      setCategory("all");
    }
  }, [location.search]);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);

        const data = await getProducts(); 
        let filtered = data;

        if (category !== "all") {
          filtered = data.filter(
            (product) => product.category === category
          );
        }

        setProducts(filtered);
      } catch (err) {
        console.error("ERRO:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [category]);

  return (
    <div>

      
      <div className="filters">
        <button
          className={category === "all" ? "active" : ""}
          onClick={() => setCategory("all")}
        >
          <i className="fa-solid fa-border-all"></i>
          Todos os departamentos
        </button>

        <button
          className={category === "electronics" ? "active" : ""}
          onClick={() => setCategory("electronics")}
        >
          <i className="fa-solid fa-tv"></i>
          Eletrônicos
        </button>

        <button
          className={category === "jewelery" ? "active" : ""}
          onClick={() => setCategory("jewelery")}
        >
          <i className="fa-solid fa-gem"></i>
          Joias
        </button>

        <button
          className={category === "men's clothing" ? "active" : ""}
          onClick={() => setCategory("men's clothing")}
        >
          <i className="fa-solid fa-shirt"></i>
          Masculino
        </button>

        <button
          className={category === "women's clothing" ? "active" : ""}
          onClick={() => setCategory("women's clothing")}
        >
          <i className="fa-solid fa-bag-shopping"></i>
          Feminino
        </button>
      </div>

      
      <div className="grid">
        {products
          .filter((product) => {
            const searchText = search?.toLowerCase().trim() || "";

            const traduzir = {
              jaqueta: "jacket",
              camisa: "shirt",
              bolsa: "bag",
              relogio: "watch",
              joia: "jewelery",
              feminino: "women",
              masculino: "men",
            };

            const termo = traduzir[searchText] || searchText;

            return (
              product.title?.toLowerCase().includes(termo) ||
              product.description?.toLowerCase().includes(termo) ||
              product.category?.toLowerCase().includes(termo)
            );
          })
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>

      
      {loading && (
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Carregando...
        </p>
      )}
    </div>
  );
}

export default Home;