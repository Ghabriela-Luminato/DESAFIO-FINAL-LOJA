import { useCart } from "../context/CartContext";

function CartSidebar() {
  const {
    cart,
    openCart,
    setOpenCart,
    removeItem,
    increase,
    decrease
  } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className={`cartSidebar ${openCart ? "open" : ""}`}>

      <div className="cartHeader">
        <h2>Seu Carrinho</h2>
        <button onClick={() => setOpenCart(false)}>X</button>
      </div>

      {cart.length === 0 ? (
        <p className="emptyCart">Carrinho vazio</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cartItem">

              <img src={item.thumbnail} alt={item.title} />

              <div>
                <h4>{item.title}</h4>
                <p>R$ {item.price}</p>

                <div className="qty">
                  <button onClick={() => decrease(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increase(item.id)}>+</button>
                </div>

                <button
                  className="removeBtn"
                  onClick={() => removeItem(item.id)}
                >
                  remover
                </button>
              </div>

            </div>
          ))}

          <h3 className="cartTotal">
            Total: R$ {total.toFixed(2)}
          </h3>

          <button className="finishBtn">
            Finalizar Compra
          </button>
        </>
      )}

    </div>
  );
}

export default CartSidebar;