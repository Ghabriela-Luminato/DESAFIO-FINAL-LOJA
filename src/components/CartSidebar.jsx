import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { applyCoupon } from "../utils/coupon";

function money(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

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

  const [coupon, setCoupon] = useState("");

  const cep = localStorage.getItem("cep") || "";
  const hasCep = cep.length === 9;

  function getRegionByCep(cep) {
    const inicio = Number(cep.replace("-", "").slice(0, 2));

    if (inicio >= 30 && inicio <= 39) return "MG";
    if (inicio >= 1 && inicio <= 29) return "SUDESTE";
    if (inicio >= 40 && inicio <= 65) return "NORDESTE";
    if (inicio >= 80 && inicio <= 99) return "SUL";

    return "OUTROS";
  }

  const region = hasCep ? getRegionByCep(cep) : "";

  function getShipping(region) {
    switch (region) {
      case "MG":
        return { price: 0, prazo: "1 a 2 dias" };
      case "SUDESTE":
        return { price: 14.9, prazo: "2 a 4 dias" };
      case "NORDESTE":
        return { price: 24.9, prazo: "5 a 8 dias" };
      case "SUL":
        return { price: 19.9, prazo: "4 a 7 dias" };
      default:
        return { price: 29.9, prazo: "6 a 10 dias" };
    }
  }

  const shipping = hasCep
    ? getShipping(region)
    : { price: 0, prazo: "-" };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const couponData = applyCoupon(coupon, subtotal);

  const total =
    subtotal + shipping.price - couponData.discount;

  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  // ✅ CORREÇÃO AQUI
  function finalizarCompra() {
    const data = {
      cart,
      subtotal,
      shipping,
      coupon: couponData,
      total
    };

    localStorage.setItem(
      "checkoutData",
      JSON.stringify(data)
    );

    setOpenCart(false);

    navigate("/checkout", {
      state: data
    });
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
        <p className="emptyCart">Seu carrinho está vazio</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cartItem">
              <img src={item.thumbnail} alt={item.title} />

              <div className="cartInfo">
                <h4>{item.title}</h4>

                <p>{money(item.price)}</p>

                <div className="qty">
                  <button onClick={() => decrease(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increase(item.id)}>+</button>
                </div>

                <small>
                  Subtotal: {money(item.price * item.quantity)}
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
            <div className="couponBox">
              <input
                placeholder="Cupom"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
              />

              {couponData.message && (
                <span>{couponData.message}</span>
              )}
            </div>

            <div className="cartResume">
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>

            <div className="cartResume">
              <span>Frete</span>
              <span>
                {hasCep
                  ? shipping.price === 0
                    ? "Grátis"
                    : money(shipping.price)
                  : "--"}
              </span>
            </div>

            {couponData.discount > 0 && (
              <div className="cartResume">
                <span>Desconto</span>
                <span>- {money(couponData.discount)}</span>
              </div>
            )}

            <div className="cartTotal">
              <span>Total</span>
              <span>{money(total)}</span>
            </div>

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