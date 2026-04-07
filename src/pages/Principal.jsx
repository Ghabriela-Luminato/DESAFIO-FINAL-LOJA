import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

import Carousel from "../components/Carousel.jsx";
import PageTransition from "../components/PageTransition.jsx";
import DailyDeals from "../components/DailyDeals.jsx";
import Categorias from "../components/Categorias.jsx";
import Reviews from "../components/Reviews.jsx";
import SecurePayment from "../components/SecurePayment.jsx";
import Footer from "../components/Footer.jsx";

function Principal() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      try {
        const data = await getProducts();

        if (mounted) {
          setProducts(data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);

        if (mounted) {
          setError(err);
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <PageTransition>
      <>
        <div className="container">

          {/* ================= MENU ================= */}
          <div className="filters">

            <Link to="/produtos?cat=all">
              <button>
                <i className="fa-solid fa-border-all"></i>
                Todos
              </button>
            </Link>

            
            <Link to="/produtos?cat=smartphones">
              <button>
                <i className="fa-solid fa-mobile-screen"></i>
                Celulares
              </button>
            </Link>

            <Link to="/produtos?cat=laptops">
              <button>
                <i className="fa-solid fa-laptop"></i>
                Notebooks
              </button>
            </Link>

            <Link to="/produtos?cat=eletronicos">
              <button>
                <i className="fa-solid fa-plug"></i>
                Eletrônicos
              </button>
            </Link>

            <Link to="/produtos?cat=fragrances">
              <button>
                <i className="fa-solid fa-spray-can-sparkles"></i>
                Perfumes
              </button>
            </Link>

            <Link to="/produtos?cat=skincare">
              <button>
                <i className="fa-solid fa-face-smile"></i>
                Skincare
              </button>
            </Link>

            
           <Link to="/produtos?cat=home-decoration">
              <button>
                <i className="fa-solid fa-couch"></i>
                Casa
              </button>
            </Link>

          </div>

          {/* 🔹 CARROSSEL */}
          <div className="carousel-wrapper">
            <Carousel />
          </div>

          {/* 🔹 OFERTAS */}
          <DailyDeals products={products} />

          {/* 🔹 CATEGORIAS */}
          <Categorias />

          {/* 🔹 AVALIAÇÕES */}
          <Reviews />

          {/* 🔹 PAGAMENTO */}
          <SecurePayment />

          {/* 🔹 LOADING */}
          {loading && (
            <p style={{ textAlign: "center", fontSize: "14px", opacity: 0.7 }}>
              Carregando...
            </p>
          )}

          {/* 🔹 ERRO */}
          {error && (
            <p style={{ textAlign: "center", color: "red" }}>
              Erro ao carregar produtos
            </p>
          )}

        </div>

        <Footer />
      </>
    </PageTransition>
  );
}

export default Principal;