import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../index.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (mounted) setProduct(data);
      });

    return () => (mounted = false);
  }, [id]);

  if (!product) return <p>Carregando...</p>;

  return (
    <div className="product-page">

      <div className="product-container">


        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>

        
        <div className="product-info">
          <h1 className="product-name">{product.title}</h1>

          <h3 className="price">
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })}
          </h3>

          <button className="buy-btn">Comprar</button>
        </div>

      </div>


    </div>
  );
}

export default ProductDetails;