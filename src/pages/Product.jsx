import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/api"; // 🔥

function Product() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [reviews, setReviews] = useState([]);

  const cep = localStorage.getItem("cep");
  const frete = localStorage.getItem("frete");

  // 🔥 AGORA USANDO SERVICE
  useEffect(() => {
    async function loadProduct() {
      const data = await getProductById(id);
      setProduct(data);
    }

    loadProduct();
  }, [id]);

  // -------- REVIEWS --------
  const homens = ["Carlos", "Marcos", "Lucas", "Rafael", "Bruno", "Gustavo", "Felipe", "Leonardo", "Matheus", "Thiago", "Eduardo", "Rodrigo", "André", "Diego", "Vitor", "Samuel", "Fernando", "Alexandre", "Ricardo", "Guilherme"];
  const mulheres = ["Ana", "Juliana", "Fernanda", "Patrícia", "Camila", "Sofia", "Isabela", "Maria", "Larissa", "Beatriz", "Carla", "Renata", "Aline", "Vanessa", "Gabriela", "Bruna", "Mariana", "Letícia", "Amanda", "Bianca"];

  const comentarios = [
    "Produto excelente, recomendo!",
    "Muito bom pelo preço.",
    "Chegou rápido e bem embalado.",
    "Qualidade acima do esperado.",
    "Gostei bastante, compraria de novo.",
    "Vale muito a pena!",
    "Atendeu minhas expectativas.",
    "Muito bonito e funcional.",
    "Entrega rápida!",
    "Perfeito!"
  ];

  function gerarReviews() {
    return Array.from({ length: 4 }, () => {
      const isHomem = Math.random() > 0.5;

      const nome = isHomem
        ? homens[Math.floor(Math.random() * homens.length)]
        : mulheres[Math.floor(Math.random() * mulheres.length)];

      const comentario =
        comentarios[Math.floor(Math.random() * comentarios.length)];

      const nota = Math.floor(Math.random() * 2) + 4;
      const fotoId = Math.floor(Math.random() * 70);

      return {
        nome,
        nota,
        comentario,
        foto: `https://randomuser.me/api/portraits/${isHomem ? "men" : "women"}/${fotoId}.jpg`
      };
    });
  }

  useEffect(() => {
    setReviews(gerarReviews());
  }, [id]);

  function aumentar() {
    setQuantidade(q => q + 1);
  }

  function diminuir() {
    if (quantidade > 1) {
      setQuantidade(q => q - 1);
    }
  }

  if (!product) return <p>Carregando...</p>;

  return (
    <div className="product-page">

      <div className="product-container">

        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>

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
              <span className="frete">{frete || "Frete calculado"}</span>
            ) : (
              <span className="frete-warning">
                Informe seu CEP para calcular o frete
              </span>
            )}
          </div>

          <div className="quantidade-box">
            <button onClick={diminuir}>-</button>
            <span>{quantidade}</span>
            <button onClick={aumentar}>+</button>
          </div>

          <div className="actions">
            <button className="add-cart">
              Adicionar ao carrinho
            </button>

            <button className="buy">
              Comprar agora
            </button>
          </div>

          <div className="rating-box">
            <span>⭐ {product.rating?.rate}</span>
            <span>({product.rating?.count} avaliações)</span>
          </div>
        </div>
      </div>

      <div className="reviews">
        <h2>Avaliações dos clientes</h2>

        {reviews.map((r, index) => (
          <div className="review-card" key={index}>
            <img src={r.foto} alt={r.nome} />

            <div className="review-info">
              <strong>{r.nome}</strong>
              <span className="stars">⭐ {r.nota}</span>
              <p>{r.comentario}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Product;