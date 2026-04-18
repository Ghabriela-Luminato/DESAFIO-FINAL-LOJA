 import { useLocation } from "react-router-dom";


function Checkout() {
  const location = useLocation();

  let state = location.state;

  // fallback (caso dê refresh)
  if (!state) {
    const saved = localStorage.getItem("checkoutData");
    if (saved) {
      state = JSON.parse(saved);
    }
  }

  if (!state) {
    return <h2 style={{ padding: 20 }}>Erro: dados não encontrados</h2>;
  }

  const { cart, subtotal, shipping, coupon, total } = state;

  function money(v) {
    return v.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }

  async function pagar() {
    try {
      const data = await createPayment({
        cart,
        total,
        shipping: shipping?.price || 0,
        discount: coupon?.discount || 0
      });

      window.location.href = data.checkoutUrl;

    } catch (err) {
      console.error(err);
      alert("Erro ao iniciar pagamento");
    }
  }

  return (
    <div className="checkout-page">

      {/* 🔹 ESQUERDA - PRODUTOS */}
      <div className="checkout-items">
        <h2>Produtos</h2>

        {cart.map(item => (
          <div key={item.id} className="checkout-item">
            <img
              src={item.thumbnail}
              alt={item.title}
            />

            <div className="checkout-item-info">
              <h4>{item.title}</h4>

              <span>Quantidade: {item.quantity}</span>

              <p>
              <strong>
                {money(item.price * item.quantity)}
              </strong>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 DIREITA - RESUMO */}
      <div className="checkout-summary">
        <h3>Resumo do Pedido</h3>

        <div className="summary-line">
          <span>Subtotal</span>
          <span>{money(subtotal)}</span>
        </div>

        <div className="summary-line">
          <span>Frete</span>
          <span>
            {shipping?.price === 0
              ? "Grátis"
              : money(shipping?.price || 0)}
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

        <button className="pay-button" onClick={pagar}>
          Pagar
        </button>
      </div>

    </div>
  );
}

export default Checkout;