import { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

function Favorites() {
  const { favorites } = useFavorites();
  const { addToCart } = useCart();

  // agora guarda só IDs
  const [selected, setSelected] = useState([]);

  // selecionar / desmarcar
  function toggleSelect(product) {
    setSelected(prev => {
      const exists = prev.includes(product.id);

      if (exists) {
        return prev.filter(id => id !== product.id);
      } else {
        return [...prev, product.id];
      }
    });
  }

  // selecionar todos
  function selectAll() {
    if (selected.length === favorites.length) {
      setSelected([]);
    } else {
      setSelected(favorites.map(p => p.id));
    }
  }

  // comprar selecionados
  function buySelected() {
    const items = favorites.filter(p =>
      selected.includes(p.id)
    );

    items.forEach(p => addToCart(p));

    setSelected([]);
  }

  // total correto
  const total = favorites
    .filter(p => selected.includes(p.id))
    .reduce((acc, p) => acc + p.price, 0);

  const totalFmt = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  return (
    <div className="favorites-page">
      <h2>Meus Favoritos</h2>

      {favorites.length === 0 ? (
        <p>Nenhum produto favoritado.</p>
      ) : (
        <>
          {/* TOPO */}
          <div className="fav-top">
            <button onClick={selectAll}>
              {selected.length === favorites.length
                ? "Desmarcar todos"
                : "Selecionar todos"}
            </button>
          </div>

          {/* GRID */}
          <div className="favorites-grid">
            {favorites.map(product => {
              const isSelected = selected.includes(product.id);

              return (
                <div className="fav-item" key={product.id}>
                  
                  <input
                    type="checkbox"
                    className="fav-checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelect(product)}
                  />

                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>

          {/* BARRA FIXA */}
          <div className="fav-bar">
            <span>
              Total: <strong>{totalFmt}</strong>
            </span>

            <button
              onClick={buySelected}
              disabled={selected.length === 0}
            >
              Comprar ({selected.length})
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Favorites;