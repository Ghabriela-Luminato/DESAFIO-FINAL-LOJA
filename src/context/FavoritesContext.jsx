import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const FavoritesContext =
  createContext();

export function FavoritesProvider({
  children
}) {
  const [favorites, setFavorites] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "favorites"
        );

      return saved
        ? JSON.parse(saved)
        : [];
    });

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  function addFavorite(product) {
    const exists =
      favorites.find(
        (item) =>
          item.id === product.id
      );

    if (exists) return;

    setFavorites([
      ...favorites,
      product
    ]);
  }

  function removeFavorite(id) {
    setFavorites(
      favorites.filter(
        (item) => item.id !== id
      )
    );
  }

  function toggleFavorite(product) {
    const exists =
      favorites.find(
        (item) =>
          item.id === product.id
      );

    if (exists) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  }

  function isFavorite(id) {
    return favorites.some(
      (item) => item.id === id
    );
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(
    FavoritesContext
  );
}