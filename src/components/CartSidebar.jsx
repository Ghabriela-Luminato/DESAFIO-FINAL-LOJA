import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";

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

  const [coupon, setCoupon] = useState("");
  const [shippingMethod, setShippingMethod] =
    useState("loggi");

  /* CEP REAL */
  const cep =
    localStorage.getItem("cep") || "";

  const hasCep = cep.length === 9;

  const state =
    cep.startsWith("35") ? "MG" : "OUTRO";

  const subtotal = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  /* SEM CEP = SEM TAXA */
  const shipping = hasCep
    ? calculateShipping({
        state,
        subtotal,
        method: shippingMethod
      })
    : {
        price: 0,
        days: "-"
      };

  const couponData = applyCoupon(
    coupon,
    subtotal
  );

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
    <div
      className={`cartSidebar ${
        openCart ? "open" : ""
      }`}
    >
      <div className="cartHeader">
        <div>
          <h2>Seu Carrinho</h2>
          <span>{totalItems} itens</span>
        </div>

        <button
          onClick={() =>
            setOpenCart(false)
          }
        >
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
            <div
              key={item.id}
              className="cartItem"
            >
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
                  <button
                    onClick={() =>
                      decrease(item.id)
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increase(item.id)
                    }
                  >
                    +
                  </button>
                </div>

                <small>
                  Subtotal: R${" "}
                  {(
                    item.price *
                    item.quantity
                  ).toFixed(2)}
                </small>

                <button
                  className="removeBtn"
                  onClick={() =>
                    removeItem(item.id)
                  }
                >
                  remover
                </button>
              </div>
            </div>
          ))}

          <div className="cartFooter">

            {/* FRETES */}
            <div className="shippingOptions">

              <label>
                <input
                  type="radio"
                  checked={
                    shippingMethod ===
                    "loggi"
                  }
                  onChange={() =>
                    setShippingMethod(
                      "loggi"
                    )
                  }
                />

                Loggi
                <small>
                  {hasCep
                    ? "R$ 25,90 • 1 a 2 dias"
                    : "Informe CEP"}
                </small>
              </label>

              <label>
                <input
                  type="radio"
                  checked={
                    shippingMethod ===
                    "correios"
                  }
                  onChange={() =>
                    setShippingMethod(
                      "correios"
                    )
                  }
                />

                Correios
                <small>
                  {hasCep
                    ? "R$ 18,90 • 4 a 7 dias"
                    : "Informe CEP"}
                </small>
              </label>

            </div>

            {/* CUPOM */}
            <div className="couponBox">
              <input
                placeholder="Cupom"
                value={coupon}
                onChange={(e) =>
                  setCoupon(
                    e.target.value
                  )
                }
              />

              {couponData.message && (
                <span>
                  {
                    couponData.message
                  }
                </span>
              )}
            </div>

            {/* RESUMO */}
            <div className="cartResume">
              <span>
                Subtotal
              </span>

              <span>
                R$ {subtotal.toFixed(2)}
              </span>
            </div>

            <div className="cartResume">
              <span>Frete</span>

              <span>
                {hasCep
                  ? `R$ ${shipping.price.toFixed(
                      2
                    )}`
                  : "--"}
              </span>
            </div>

            {couponData.discount >
              0 && (
              <div className="cartResume">
                <span>
                  Desconto
                </span>

                <span>
                  - R$ {couponData.discount.toFixed(
                    2
                  )}
                </span>
              </div>
            )}

            <div className="cartTotal">
              <span>Total</span>

              <span>
                R$ {total.toFixed(2)}
              </span>
            </div>

            <button
              className="continueBtn"
              onClick={() =>
                setOpenCart(false)
              }
            >
              Continuar comprando
            </button>

            <button
              className="finishBtn"
              onClick={
                finalizarCompra
              }
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