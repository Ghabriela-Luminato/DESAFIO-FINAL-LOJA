import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {

  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    console.log("SALVANDO FAVORITOS:", favorites); 
  }, [favorites]);

  function toggleFavorite(product) {
    if (!product || !product.id) {
      console.error("ERRO: produto sem ID", product);
      return;
    }

    setFavorites(prev => {
      const exists = prev.some(p => p.id === product.id);

      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }

      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          thumbnail: product.thumbnail,
          price: product.price
        }
      ];
    });
  }

  function isFavorite(id) {
    return favorites.some(p => p.id === id);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}