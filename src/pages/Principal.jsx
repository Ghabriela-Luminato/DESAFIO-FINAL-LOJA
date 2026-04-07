import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../services/api"; // 🔥

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
        const data = await getProducts(); // ✅ USANDO SERVICE

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
            <Link to="/produtos">
              <button>
                <i className="fa-solid fa-border-all"></i>
                Todos os departamentos
              </button>
            </Link>

            <Link to="/produtos?cat=electronics">
              <button>
                <i className="fa-solid fa-tv"></i>
                Eletrônicos
              </button>
            </Link>

            <Link to="/produtos?cat=jewelery">
              <button>
                <i className="fa-solid fa-gem"></i>
                Joias
              </button>
            </Link>

            <Link to="/produtos?cat=men's clothing">
              <button>
                <i className="fa-solid fa-shirt"></i>
                Masculino
              </button>
            </Link>

            <Link to="/produtos?cat=women's clothing">
              <button>
                <i className="fa-solid fa-bag-shopping"></i>
                Feminino
              </button>
            </Link>
          </div>

          <div className="carousel-wrapper">
            <Carousel />
          </div>

          <DailyDeals products={products} />

          <Categorias />

          <Reviews />

          <SecurePayment />
        </div>

        <Footer />
      </>
    </PageTransition>
  );
}

export default Principal;