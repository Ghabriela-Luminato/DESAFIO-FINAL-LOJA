import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Checkout() {
  const location = useLocation();

  let state = location.state;

  if (!state) {
    const saved = localStorage.getItem("checkoutData");
    if (saved) state = JSON.parse(saved);
  }

  if (!state) {
    return <h2 style={{ padding: 20 }}>Erro: dados não encontrados</h2>;
  }

  const { cart, subtotal, shipping, coupon, total } = state;

  const [updatedShipping, setUpdatedShipping] = useState(
    localStorage.getItem("shipping")
      ? JSON.parse(localStorage.getItem("shipping"))
      : shipping
  );

  const [address, setAddress] = useState(localStorage.getItem("address") || "");
  const [number, setNumber] = useState(localStorage.getItem("number") || "");
  const [savedAddress, setSavedAddress] = useState(
    localStorage.getItem("address") && localStorage.getItem("number")
  );

  const [cep, setCep] = useState(localStorage.getItem("cep") || "");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const novoCep = localStorage.getItem("cep") || "";
      const novoFrete = localStorage.getItem("shipping");

      if (novoCep !== cep) setCep(novoCep);

      if (novoFrete) {
        setUpdatedShipping(JSON.parse(novoFrete));
      } else {
        setUpdatedShipping(null);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [cep]);

  async function buscarCep() {
    if (!cep) return;

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();

      if (!data.erro) {
        setCity(data.localidade);
        setUf(data.uf);
      }
    } catch {
      console.log("Erro ao buscar CEP");
    }
  }

  useEffect(() => {
    buscarCep();
  }, [cep]);

  function salvarEndereco() {
    if (!address || !number) {
      alert("Preencha endereço e número");
      return;
    }

    localStorage.setItem("address", address);
    localStorage.setItem("number", number);
    setSavedAddress(true);
  }

  function getPrazo(uf) {
    if (uf === "MG") return "1 a 2 dias";
    if (["SP", "RJ", "ES"].includes(uf)) return "2 a 4 dias";
    if (["BA", "PE", "CE"].includes(uf)) return "5 a 8 dias";
    if (["PR", "SC", "RS"].includes(uf)) return "4 a 7 dias";
    return "6 a 10 dias";
  }

  function money(v) {
    return v.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }

  async function pagar() {
    if (!updatedShipping) {
      alert("Calcule o frete antes de pagar.");
      return;
    }

    if (!savedAddress) {
      alert("Salve o endereço primeiro.");
      return;
    }

    setPaying(true);

    try {
      const res = await fetch("http://localhost:3000/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            title: item.title,
            price: Number(item.price),
            quantity: Number(item.quantity || 1)
          }))
        })
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Erro ao gerar pagamento.");
      }

    } catch {
      alert("Erro ao iniciar pagamento.");
    } finally {
      setPaying(false);
    }
  }

  return (
    <div className="checkout-page">

      <div className="checkout-items">
        <h2>Produtos</h2>

        {cart.map(item => (
          <div key={item.id} className="checkout-item">
            <img src={item.thumbnail} alt={item.title} />

            <div>
              <h4>{item.title}</h4>
              <span>Qtd: {item.quantity}</span>
              <p>
                <strong>{money(item.price * item.quantity)}</strong>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="checkout-right">

        <div className="checkout-summary">
          <h3>Resumo</h3>

          <div className="summary-line">
            <span>Subtotal</span>
            <span>{money(subtotal)}</span>
          </div>

          <div className="summary-line">
            <span>Frete</span>
            <span>
              {!updatedShipping
                ? "--"
                : updatedShipping.price === 0
                ? "Grátis"
                : money(updatedShipping.price)}
            </span>
          </div>

          {(coupon?.discount || 0) > 0 && (
            <div className="summary-line">
              <span>Desconto</span>
              <span>-{money(coupon.discount)}</span>
            </div>
          )}

          <div className="summary-total">
            <span>Total</span>
            <span>{money(total)}</span>
          </div>

          {!updatedShipping && (
            <p
              style={{
                color: "#e53935",
                fontSize: "14px",
                marginTop: "10px",
                fontWeight: "600",
                textAlign: "center"
              }}
            >
              Informe o CEP para liberar o pagamento.
            </p>
          )}

          <button
            className="pay-button"
            onClick={pagar}
            disabled={!savedAddress || !updatedShipping || paying}
          >
            {paying ? "Processando..." : "Pagar"}
          </button>
        </div>

        <div className="checkout-shipping">
          <h3>Entrega</h3>

          {!savedAddress ? (
            <>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Rua / Endereço"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input"
                />

                <input
                  type="text"
                  placeholder="Nº"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="input input-number"
                />
              </div>

              <button
                className="save-address"
                onClick={salvarEndereco}
              >
                Salvar endereço
              </button>
            </>
          ) : (
            <div className="saved-address">
              <div className="summary-line">
                <span>Endereço</span>
                <span>{address}, {number}</span>
              </div>

              <button
                className="edit-address"
                onClick={() => setSavedAddress(false)}
              >
                Editar
              </button>
            </div>
          )}

          <div className="summary-line">
            <span>CEP</span>
            <span>{cep || "--"}</span>
          </div>

          <div className="summary-line">
            <span>Cidade</span>
            <span>{city ? `${city} - ${uf}` : "--"}</span>
          </div>

          <div className="summary-line">
            <span>Prazo</span>
            <span>{uf ? getPrazo(uf) : "--"}</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;