import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const price = product.price;

  const priceFmt = price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  const oldPrice = (price * 1.15).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  const installment = (price / 6).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  const rating = product.rating || 0;
  const ratingCount = product.stock || 0;

  return (
    <div className="card">

      <Link to={`/product/${product.id}`} className="card-link">

        <img
          src={product.thumbnail}
          alt={product.title}
          className="card-img"
        />

        <div className="rating-row">
          <div className="stars">
            {[1,2,3,4,5].map(i => (
              <span
                key={i}
                className={i <= Math.round(rating) ? "star active" : "star"}
              >
                ★
              </span>
            ))}
          </div>

          <span className="rating-count">({ratingCount})</span>
        </div>

        <h3 className="card-title">{product.title}</h3>

        <p className="old-price">{oldPrice}</p>

        <p className="card-price">{priceFmt}</p>

        <p className="installments">
          em até 6x de {installment} sem juros
        </p>

      </Link>

      <button
        className="add-cart"
        onClick={() => addToCart(product)}
      >
        Adicionar ao Carrinho
      </button>

    </div>
  );
}

export default ProductCard;