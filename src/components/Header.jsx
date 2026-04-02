import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header({ setSearch }) {
  const navigate = useNavigate();

  const [cep, setCep] = useState(() => localStorage.getItem("cep") || "");
  const [cidade, setCidade] = useState(() => localStorage.getItem("cidade") || "");
  const [frete, setFrete] = useState(() => localStorage.getItem("frete") || "");

  const [user, setUser] = useState("");

  //  DARK MODE
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
    localStorage.setItem("cep", cep);
    localStorage.setItem("cidade", cidade);
    localStorage.setItem("frete", frete);
  }, [cep, cidade, frete]);

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  function buscarCep(valor) {
    let valorFormatado = valor
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d)/, "$1-$2")
      .slice(0, 9);

    setCep(valorFormatado);

    const cepLimpo = valorFormatado.replace("-", "");

    if (cepLimpo.length !== 8) return;

    fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
      .then(res => res.json())
      .then(data => {
        if (data.erro) {
          setCidade("CEP não encontrado");
          setFrete("");
        } else {
          let rua = data.logradouro || data.localidade;

          let ruaCurta =
            rua.length > 12
              ? rua.substring(0, rua.lastIndexOf(" ", 12)) + "..."
              : rua;

          setCidade(ruaCurta);

          if (data.uf === "MG") {
            setFrete("FRETE GRÁTIS!");
          } else {
            setFrete("FRETE CALCULADO!");
          }
        }
      })
      .catch(() => {
        setCidade("Erro ao buscar CEP");
      });
  }

  function limparCep() {
    setCep("");
    setCidade("");
    setFrete("");

    localStorage.removeItem("cep");
    localStorage.removeItem("cidade");
    localStorage.removeItem("frete");
  }

  return (
    <>
      <div className="top-bar">
        <strong>FRETE GRÁTIS</strong>
        <span> para toda região de MINAS GERAIS !! </span>
      </div>

      <header className="header">

        <div
          className="logo"
          onClick={() => {
            if (window.location.pathname === "/") {
              window.location.reload();
            } else {
              navigate("/");
            }
          }}
        >
       <img
  src="/logo.svg"
  alt="Panda Store"
/>
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
                <strong>{frete}</strong>
              </div>
            </div>
          )}
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

          <a href="#">
            <i className="fa-solid fa-cart-shopping cartIcon"></i>
          </a>

          {/*  BOTÃO DARK MODE */}
            <div className="themeToggle" onClick={() => setDark(!dark)}>
  <i className={dark ? "fa-solid fa-moon" : "fa-solid fa-sun"}></i>
</div>

          <div
            className="loginArea"
            onClick={() => {
              if (!user) {
                navigate("/login");
              } else {
                localStorage.removeItem("loggedUser");
                window.location.reload();
              }
            }}
          >
            <i className="fa-regular fa-user userIcon"></i>

            <span className="loginText">
              {user ? (
                <>
                  Olá, <strong>{user}</strong>
                </>
              ) : (
                "Entrar"
              )}
            </span>
          </div>

        </nav>

      </header>
    </>
  );
}

export default Header;