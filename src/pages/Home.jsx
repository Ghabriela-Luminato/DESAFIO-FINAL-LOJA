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

      
        const allowedCategories = [
          "clothes",
          "electronics",
          "furniture",
          "shoes",
          "others"
        ];

        const categoryMap = {
          electronics: ["electronics"],
          jewelery: ["others"],
          "men's clothing": ["clothes"],
          "women's clothing": ["clothes"],
          skincare: ["others"]
        };

     
        let filtered = data.filter((product) =>
          allowedCategories.includes(
            product.category?.name?.toLowerCase()
          )
        );

   
        if (category !== "all") {
          const mapped = categoryMap[category] || [];

          filtered = filtered.filter((product) =>
            mapped.includes(
              product.category?.name?.toLowerCase()
            )
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

      {/* 🔹 FILTROS */}
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

        <button
          className={category === "skincare" ? "active" : ""}
          onClick={() => setCategory("skincare")}
        >
          <i className="fa-solid fa-pump-soap"></i>
          Skincare
        </button>
      </div>

      {/* 🔹 PRODUTOS */}
      <div className="grid">
        {products
          .filter((product) => {
            const searchText = search?.toLowerCase().trim() || "";

            const traduzir = {
              jaqueta: "jacket",
              camisa: "shirt",
              bolsa: "bag",
              relogio: "watch",
              joia: "jewellery",
              feminino: "women",
              masculino: "men",
              perfume: "perfume",
              creme: "cream"
            };

            const termo = traduzir[searchText] || searchText;

            return (
              product.title?.toLowerCase().includes(termo) ||
              product.description?.toLowerCase().includes(termo) ||
              product.category?.name?.toLowerCase().includes(termo)
            );
          })
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>

      {/* 🔹 LOADING */}
      {loading && (
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Carregando...
        </p>
      )}
    </div>
  );
}

export default Home;