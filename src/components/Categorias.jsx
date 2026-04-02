

import { Link } from "react-router-dom";

import ele1 from "../assets/ele1.png";
import ele2 from "../assets/ele2.png";
import ele3 from "../assets/ele3.png";
import ele4 from "../assets/ele4.png";


export default function Categorias() {
 const categorias = [
  {
    nome: "Eletrônicos",
    img: ele1,
    to: `/produtos?cat=${encodeURIComponent("electronics")}`,
  },
  {
    nome: "Joias",
    img: ele2,
    to: `/produtos?cat=${encodeURIComponent("jewelery")}`,
  },
  {
    nome: "Masculino",
    img: ele3,
    to: `/produtos?cat=${encodeURIComponent("men's clothing")}`,
  },
  {
    nome: "Feminino",
    img: ele4,
    to: `/produtos?cat=${encodeURIComponent("women's clothing")}`,
  },
];


  return (
    <section className="categorias-wrapper">
      <h2 className="titulo-categorias">Categorias Panda</h2>

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