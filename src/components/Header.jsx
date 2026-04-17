import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { getCepData } from "../services/cep";

import { useCart } from "../context/CartContext";
import CartSidebar from "./CartSidebar";

function Header({ setSearch }) {
  const navigate = useNavigate();

  const { cart, openCart, setOpenCart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const [cep, setCep] = useState(() => localStorage.getItem("cep") || "");
  const [cidade, setCidade] = useState(() => localStorage.getItem("cidade") || "");
  const [frete, setFrete] = useState(() => localStorage.getItem("frete") || "");
  const [user, setUser] = useState("");

  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

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

  function buscarCep(valor) {
    setCep(valor);
  }

  return (
    <>
      <div className="top-bar">
        <strong>FRETE GRÁTIS</strong>
        <span> para toda região de MINAS GERAIS !! </span>
      </div>

      <header className="header">

        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="Panda Store" />
        </div>

        <div className="searchBox">
          <i className="fa-solid fa-magnifying-glass lupa"></i>

          <input
            type="text"
            placeholder="Buscar produtos..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <nav className="menu">

          <a href="#">
            <i className="fa-regular fa-heart heartIcon"></i>
          </a>

          {/* CARRINHO */}
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