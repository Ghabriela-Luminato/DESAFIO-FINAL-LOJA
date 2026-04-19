import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import { getCepData } from "../services/cep";
import { getProducts } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import CartSidebar from "./CartSidebar";

function getShippingByCep(cep) {
  const inicio = Number(cep.replace("-", "").slice(0, 2));

  if (inicio >= 30 && inicio <= 39) return { label: "FRETE GRÁTIS!", price: 0 };
  if (inicio >= 1 && inicio <= 29) return { label: "FRETE CALCULADO!", price: 14.9 };
  if (inicio >= 40 && inicio <= 65) return { label: "FRETE CALCULADO!", price: 24.9 };
  if (inicio >= 80 && inicio <= 99) return { label: "FRETE CALCULADO!", price: 19.9 };

  return { label: "FRETE CALCULADO!", price: 29.9 };
}

function Header({ setSearch }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isProdutosPage = location.pathname === "/produtos";

  const { favorites } = useFavorites();
  const { cart, setOpenCart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const [cep, setCep] = useState(() => localStorage.getItem("cep") || "");
  const [cidade, setCidade] = useState(() => localStorage.getItem("cidade") || "");

  const [frete, setFrete] = useState(() => {
    const saved = localStorage.getItem("shipping");
    return saved ? JSON.parse(saved) : null;
  });

  const [user, setUser] = useState("");
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  const [allProducts, setAllProducts] = useState([]);
  const [results, setResults] = useState([]);

  const searchRef = useRef(null);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) setUser(loggedUser);
  }, []);

  useEffect(() => {
    async function load() {
      const data = await getProducts();
      setAllProducts(data);
    }
    load();
  }, []);

  useEffect(() => {
    localStorage.setItem("cep", cep);
    localStorage.setItem("cidade", cidade);

    if (frete) {
      localStorage.setItem("shipping", JSON.stringify(frete));
    }
  }, [cep, cidade, frete]);

  function buscarCep(valor) {
    let valorFormatado = valor
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);

    setCep(valorFormatado);

    const cepLimpo = valorFormatado.replace("-", "");
    if (cepLimpo.length !== 8) return;

    getCepData(cepLimpo)
      .then((data) => {
        if (data.erro) {
          setCidade("CEP não encontrado");
          setFrete(null);
        } else {
          let rua = data.logradouro || data.localidade;

          let ruaCurta =
            rua.length > 12
              ? rua.substring(0, rua.lastIndexOf(" ", 12)) + "..."
              : rua;

          setCidade(ruaCurta);

          const shipping = getShippingByCep(cepLimpo);
          setFrete(shipping);
        }
      })
      .catch(() => {
        setCidade("Erro ao buscar CEP");
      });
  }

  function limparCep() {
    setCep("");
    setCidade("");
    setFrete(null);

    localStorage.removeItem("cep");
    localStorage.removeItem("cidade");
    localStorage.removeItem("shipping");
  }

  let dropdownStyle = {};
  if (searchRef.current) {
    const rect = searchRef.current.getBoundingClientRect();
    dropdownStyle = {
      position: "fixed",
      top: rect.bottom + 5,
      left: rect.left,
      width: rect.width,
      zIndex: 999999
    };
  }

  return (
    <>
      <div className="top-bar">
        <strong>FRETE GRÁTIS</strong>
        <span> para toda região de MINAS GERAIS !!</span>
      </div>

      <header className="header">

        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="Panda Store" />
        </div>

        <div className="cepBox">
          {!cidade ? (
            <>
              <span>
                <i className="fa-solid fa-location-dot localIcon"></i>
                Informe seu CEP
              </span>

              <input
                type="text"
                placeholder="00000-000"
                value={cep}
                onChange={(e) => buscarCep(e.target.value)}
              />
            </>
          ) : (
            <div className="cepResultado" onClick={limparCep}>
              <div className="linha1">
                <i className="fa-solid fa-location-dot localIcon"></i>
                <span>Entregar em {cidade}</span>
              </div>

              <div className="linha2">
                <span>{cep}</span>
                <strong>{frete?.label}</strong>
              </div>
            </div>
          )}
        </div>

        {/*  SEARCH */}
        <div className="searchBox" ref={searchRef}>
          <i className="fa-solid fa-magnifying-glass lupa"></i>

          <input
            type="text"
            placeholder="Buscar produtos..."
            onChange={(e) => {
              const value = e.target.value;

              setSearch(value);

             
              if (isProdutosPage) return;

              if (!value) {
                setResults([]);
                return;
              }

              const allowedCategories = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "beauty",
  "home-decoration",
  "furniture"
];

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
  "charger"
];

const filtered = allProducts
  .filter(p => {
    const title = p.title?.toLowerCase() || "";
    const category = p.category?.toLowerCase() || "";

    const matchSearch = title.includes(value.toLowerCase());

    const isEletronico = palavrasEletronicos.some(word =>
      title.includes(word)
    );

    return (
      matchSearch &&
      (allowedCategories.includes(category) || isEletronico)
    );
  })
  .slice(0, 5);
              setResults(filtered);
            }}
          />

          {!isProdutosPage && results.length > 0 && (
            <div className="search-dropdown" style={dropdownStyle}>
              {results.map(product => (
                <div
                  key={product.id}
                  className="search-item"
                  onClick={() => {
                    setResults([]);
                    navigate(`/product/${product.id}`);
                  }}
                >
                  <img src={product.thumbnail} alt={product.title} />
                  <span>{product.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <nav className="menu">

          <div className="cartArea" onClick={() => navigate("/favoritos")}>
            <i className="fa-regular fa-heart heartIcon"></i>
            {favorites.length > 0 && (
              <span className="cartCount">{favorites.length}</span>
            )}
          </div>

          <div className="cartArea" onClick={() => setOpenCart(true)}>
            <i className="fa-solid fa-cart-shopping cartIcon"></i>
            {totalItems > 0 && (
              <span className="cartCount">{totalItems}</span>
            )}
          </div>

          <div
            className="loginArea"
            onClick={() => {
              if (!user) navigate("/login");
              else {
                localStorage.removeItem("loggedUser");
                window.location.reload();
              }
            }}
          >
            <i className="fa-regular fa-user userIcon"></i>
            <span className="loginText">
              {user ? `Olá, ${user}` : "Entrar"}
            </span>
          </div>

          <div className="themeToggle" onClick={() => setDark(!dark)}>
            <i className={dark ? "fa-solid fa-moon" : "fa-solid fa-sun"}></i>
          </div>

        </nav>

      </header>

      <CartSidebar />
    </>
  );
}

export default Header;