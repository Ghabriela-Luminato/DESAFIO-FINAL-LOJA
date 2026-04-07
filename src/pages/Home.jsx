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

    if (cat) setCategory(decodeURIComponent(cat));
    else setCategory("all");
  }, [location.search]);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);


  const palavrasEletronicos = [
    "headphone",
    "earbud",
    "earphone",
    "speaker",
    "alexa",
    "echo",
    "smart",
    "cable",
    "usb",
    "charger",
  ];

  const isEletronico = (product) => {
    const title = product.title?.toLowerCase() || "";
    return palavrasEletronicos.some((p) => title.includes(p));
  };


  const filteredProducts = products.filter((product) => {
    const cat = product.category?.toLowerCase().trim();
    const title = product.title?.toLowerCase() || "";

    const searchText = search?.toLowerCase().trim() || "";

    const matchSearch =
      title.includes(searchText) ||
      product.description?.toLowerCase().includes(searchText);

 
    const bloqueados = [
      "groceries",
      "mens-shoes",
      "womens-shoes",
      "mens-watches",
      "womens-watches",
      "tops",
      "vehicle",
    ];

    if (bloqueados.includes(cat)) return false;

    if (category === "all") {
      return (
        cat === "smartphones" ||
        cat === "laptops" ||
        cat === "fragrances" ||
        cat === "skincare" ||
        cat === "beauty" ||
        cat === "home-decoration" ||
        cat === "furniture" ||
        isEletronico(product)
      ) && matchSearch;
    }

    // 📱 CELULARES
    if (category === "smartphones") {
      return cat === "smartphones" && matchSearch;
    }

    // 💻 NOTEBOOKS
    if (category === "laptops") {
      return cat === "laptops" && matchSearch;
    }

    // 🔌 ELETRÔNICOS (ALEXA + FONE + CABO)
    if (category === "eletronicos") {
      return isEletronico(product) && matchSearch;
    }

    // 💄 SKINCARE
    if (category === "skincare") {
      return (cat === "skincare" || cat === "beauty") && matchSearch;
    }

    // 🌸 PERFUMES
    if (category === "fragrances") {
      return cat === "fragrances" && matchSearch;
    }

    // 🏠 CASA
    if (category === "home-decoration") {
      return (cat === "home-decoration" || cat === "furniture") && matchSearch;
    }

    return false;
  });

  return (
    <div>

      {/* 🔹 FILTROS */}
      <div className="filters">

        <button onClick={() => setCategory("all")} className={category==="all"?"active":""}>
          <i className="fa-solid fa-border-all"></i>
          Todos
        </button>

        <button onClick={() => setCategory("smartphones")} className={category==="smartphones"?"active":""}>
          <i className="fa-solid fa-mobile-screen"></i>
          Celulares
        </button>

        <button onClick={() => setCategory("laptops")} className={category==="laptops"?"active":""}>
          <i className="fa-solid fa-laptop"></i>
          Notebooks
        </button>

        <button onClick={() => setCategory("eletronicos")} className={category==="eletronicos"?"active":""}>
          <i className="fa-solid fa-plug"></i>
          Eletrônicos
        </button>

        <button onClick={() => setCategory("fragrances")} className={category==="fragrances"?"active":""}>
          <i className="fa-solid fa-spray-can-sparkles"></i>
          Perfumes
        </button>

        <button onClick={() => setCategory("skincare")} className={category==="skincare"?"active":""}>
       <i className="fa-solid fa-wand-magic-sparkles"></i>
        Beleza
        </button>

        <button onClick={() => setCategory("home-decoration")} className={category==="home-decoration"?"active":""}>
          <i className="fa-solid fa-couch"></i>
          Casa
        </button>

      </div>

       {/* 🔹 GRID */}
      <div className="grid">
        {!loading &&
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>

      {/* 🔹 LOADING */}
      {loading && (
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Carregando...
        </p>
      )}

      {/* 🔹 SEM RESULTADO (SÓ NA BUSCA) */}
      {!loading && filteredProducts.length === 0 && search && (
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Nenhum resultado para "{search}"
        </p>
      )}
    </div>
  );
}

export default Home;