import { Link } from "react-router-dom";

import ele1 from "../assets/ele1.png";
import ele2 from "../assets/ele2.png";
import ele3 from "../assets/ele3.png";
import ele4 from "../assets/ele4.png";
import ele5 from "../assets/ele5.png"; 
import ele6 from "../assets/ele6.png"; 
export default function Categorias() {
  const categorias = [
    {
      nome: "Eletrônicos",
      img: ele1,

      to: "/produtos?cat=smartphones",
    },
    {
      nome: "Celulares",
      img: ele2,
      to: "/produtos?cat=smartphones",
    },
    {
      nome: "Notebooks",
      img: ele3,
      to: "/produtos?cat=laptops",
    },
    {
      nome: "Perfumes",
      img: ele4,
      to: "/produtos?cat=fragrances",
    },
    {
      nome: "Beleza",
      img: ele5,
      to: "/produtos?cat=skincare",
    },
    {
      nome: "Casa",
      img: ele6,
      to: "/produtos?cat=home-decoration",
    },
  ];

  return (
    <section className="categorias-wrapper">
      <h2 className="titulo-categorias">
        🛍️ Explore por categorias
      </h2>

      <div className="categorias-grid">
        {categorias.map((cat, index) => (
          <Link key={index} to={cat.to} className="categoria-item">
            <div className="categoria-icon">
              <img src={cat.img} alt={cat.nome} />
            </div>
            <span>{cat.nome}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}