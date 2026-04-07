import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/api";

function Product() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [mainImage, setMainImage] = useState("");

  const cep = localStorage.getItem("cep");
  const frete = localStorage.getItem("frete");

  useEffect(() => {
    async function loadProduct() {
      const data = await getProductById(id);
      setProduct(data);

    
      setMainImage(data.images?.[0]);
    }

    loadProduct();
  }, [id]);


  const nomes = ["Carlos","Marcos","Lucas","Ana","Julia","Fernanda","Bruno","Sofia"];
  const comentarios = [
    "Produto excelente!",
    "Muito bom!",
    "Chegou rápido!",
    "Recomendo!",
    "Vale a pena!"
  ];

  function gerarReviews() {
    return Array.from({ length: 4 }, () => ({
      nome: nomes[Math.floor(Math.random() * nomes.length)],
      comentario: comentarios[Math.floor(Math.random() * comentarios.length)],
      nota: Math.floor(Math.random() * 2) + 4,
      foto: `https://randomuser.me/api/portraits/lego/${Math.floor(Math.random()*10)}.jpg`
    }));
  }

  useEffect(() => {
    setReviews(gerarReviews());
  }, [id]);

  function aumentar() {
    setQuantidade(q => q + 1);
  }

  function diminuir() {
    if (quantidade > 1) setQuantidade(q => q - 1);
  }

  if (!product) return <p>Carregando...</p>;

  return (
    <div className="product-page">

      <div className="product-container">

        {/* IMAGENS */}
        <div className="product-image">

          {/* MINIATURAS */}
          <div className="thumbs">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumb"
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>

          {/* IMAGEM PRINCIPAL */}
          <div className="main-image">
            <img src={mainImage} alt={product.title} />
          </div>

        </div>

        {/*  INFO */}
        <div className="product-info">
          <h1 className="title">{product.title}</h1>

          <p className="desc">{product.description}</p>

          <h2 className="price">
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })}
          </h2>

          <div className="frete-box">
            {cep ? (
              <span>{frete || "Frete calculado"}</span>
            ) : (
              <span>Informe seu CEP</span>
            )}
          </div>

          <div className="quantidade-box">
            <button onClick={diminuir}>-</button>
            <span>{quantidade}</span>
            <button onClick={aumentar}>+</button>
          </div>

          <div className="actions">
            <button className="add-cart">Adicionar ao carrinho</button>
            <button className="buy">Comprar agora</button>
          </div>
        </div>

      </div>

      {/* REVIEWS */}
      <div className="reviews">
        <h2>Avaliações</h2>

        {reviews.map((r, i) => (
          <div key={i} className="review-card">
            <img src={r.foto} />
            <div>
              <strong>{r.nome}</strong>
              <span>⭐ {r.nota}</span>
              <p>{r.comentario}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Product;