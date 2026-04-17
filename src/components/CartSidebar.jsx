import { useNavigate } from "react-router-dom";
import { useState } from "react"; // NOVO
import { useCart } from "../context/CartContext";

// NOVO
import { calculateShipping } from "../utils/shipping";
import { applyCoupon } from "../utils/coupon";

function CartSidebar() {
  const navigate = useNavigate();

  const {
    cart,
    openCart,
    setOpenCart,
    removeItem,
    increase,
    decrease
  } = useCart();

  // =========================
  // 🆕 ESTADOS NOVOS
  // =========================
  const [coupon, setCoupon] = useState(""); // NOVO
  const [shippingMethod, setShippingMethod] = useState("correios"); // NOVO

  // 🔥 SIMULAÇÃO (depois você puxa do seu header/context)
  const state = "MG"; // ALTERADO → aqui você vai conectar com seu CEP real

  // =========================
  // 💰 CÁLCULOS
  // =========================
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // NOVO → FRETE INTELIGENTE
  const shipping = calculateShipping({
    state,
    subtotal,
    method: shippingMethod
  });

  // NOVO → CUPOM
  const couponData = applyCoupon(coupon, subtotal);

  // ALTERADO → TOTAL COM DESCONTO E FRETE
  const total =
    subtotal +
    shipping.price -
    couponData.discount;

  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  function finalizarCompra() {
    setOpenCart(false);
    navigate("/checkout");
  }

  return (
    <div className={`cartSidebar ${openCart ? "open" : ""}`}>

      <div className="cartHeader">
        <div>
          <h2>Seu Carrinho</h2>
          <span>{totalItems} itens</span>
        </div>

        <button onClick={() => setOpenCart(false)}>
          ✕
        </button>
      </div>

      {cart.length === 0 ? (
        <p className="emptyCart">
          Seu carrinho está vazio
        </p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cartItem">

              <img
                src={item.thumbnail}
                alt={item.title}
              />

              <div className="cartInfo">

                <h4>{item.title}</h4>

                <p>
                  R$ {item.price.toFixed(2)}
                </p>

                <div className="qty">

                  <button onClick={() => decrease(item.id)}>
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => increase(item.id)}>
                    +
                  </button>

                </div>

                <small>
                  Subtotal: R$ {(item.price * item.quantity).toFixed(2)}
                </small>

                <button
                  className="removeBtn"
                  onClick={() => removeItem(item.id)}
                >
                  remover
                </button>

              </div>
            </div>
          ))}

          <div className="cartFooter">

            {/* 🆕 FRETE GRÁTIS MG */}
            {state === "MG" && (
              <p className="freeShipping">
                Frete grátis para MG 🎉
              </p>
            )}

            {/* 🆕 ESCOLHA DE ENTREGA */}
            <div className="shippingOptions">
              <label>
                <input
                  type="radio"
                  checked={shippingMethod === "correios"}
                  onChange={() => setShippingMethod("correios")}
                />
                Correios
              </label>

              <label>
                <input
                  type="radio"
                  checked={shippingMethod === "loggi"}
                  onChange={() => setShippingMethod("loggi")}
                />
                Loggi (rápido)
              </label>
            </div>

            {/* 🆕 CUPOM */}
            <div className="couponBox">
              <input
                placeholder="Cupom"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />

              {couponData.message && (
                <span>{couponData.message}</span>
              )}
            </div>

            {/* 💰 RESUMO */}
            <div className="cartResume">
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>

            <div className="cartResume">
              <span>Frete</span>
              <span>
                {shipping.price === 0
                  ? "Grátis"
                  : `R$ ${shipping.price.toFixed(2)}`}
              </span>
            </div>

            {/* 🆕 DESCONTO */}
            {couponData.discount > 0 && (
              <div className="cartResume">
                <span>Desconto</span>
                <span>- R$ {couponData.discount.toFixed(2)}</span>
              </div>
            )}

            <div className="cartTotal">
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>

            {/* 🆕 CONTINUAR COMPRANDO */}
            <button
              className="continueBtn"
              onClick={() => setOpenCart(false)}
            >
              Continuar comprando
            </button>

            <button
              className="finishBtn"
              onClick={finalizarCompra}
            >
              Finalizar Compra
            </button>

          </div>
        </>
      )}

    </div>
  );
}

export default CartSidebar;