import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";
import { getProducts } from "../services/api";

function Home({ search }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  // 🔹 pegar categoria da URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("cat");

    if (cat) {
      setCategory(decodeURIComponent(cat));
    } else {
      setCategory("all");
    }
  }, [location.search]);

  // 🔥 carregar produtos + filtro
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);

        const data = await getProducts();

        // 🔥 categorias permitidas
        const allowedCategories = [
          "smartphones",
          "laptops",
          "mens-shirts",
          "mens-shoes",
          "womens-dresses",
          "womens-shoes",
          "womens-bags",
          "mens-watches",
          "womens-jewellery",
          "skincare",
          "fragrances"
        ];

        // 🔥 mapeamento das categorias do seu layout
        const categoryMap = {
          electronics: ["smartphones", "laptops"],
          jewelery: ["mens-watches", "womens-jewellery"],
          "men's clothing": ["mens-shirts", "mens-shoes"],
          "women's clothing": ["womens-dresses", "womens-shoes"],
          skincare: ["skincare", "fragrances"]
        };

        // 🔥 remove categorias indesejadas
        let filtered = data.filter((product) =>
          allowedCategories.includes(product.category)
        );

        // 🔥 aplica filtro dos botões
        if (category !== "all") {
          const mapped = categoryMap[category] || [];

          filtered = filtered.filter((product) =>
            mapped.includes(product.category)
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

        {/* 🔥 NOVO BOTÃO */}
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
              perfume: "fragrance",
              creme: "skincare"
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