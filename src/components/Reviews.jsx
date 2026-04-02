import React from "react";

function Reviews() {
  const reviews = [
    {
      name: "Eduardo ",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      rating: "5.0",
      comment: "Produtos excelentes, chegaram supeeer rápido!"
    },

    {
      name: "Lucas Machado",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      rating: "4.7",
      comment: "Qualidade acima do esperado!"
    },
    {
      name: "Cristiane",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      rating: "4.9",
      comment: "Entrega rápida e bem embalado"
    },
    {
      name: "Eder",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      rating: "4.6",
      comment: "Vale muito a pena pelo preço"
      
    },
  
  ];

  return (
    <div className="reviews-container">
      <h2 className="reviews-title">Avaliações dos Clientes</h2>

      <div className="reviews-grid">
        {reviews.map((r, i) => (
          <div key={i} className="review-card">

            <div className="review-header">
              <img src={r.avatar} alt={r.name} className="review-avatar" />

              <div>
                <p className="review-name">{r.name}</p>
                <p className="review-stars">⭐ {r.rating}</p>
              </div>
            </div>

            <p className="review-comment">"{r.comment}"</p>
            <span className="verified">✔ Compra verificada</span>

          </div>
        ))}
      </div>

      
    </div>
  );
}

export default Reviews;