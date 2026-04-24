import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  const [openCart, setOpenCart] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 🔥 NORMALIZA PREÇO
  function normalizePrice(price) {
    if (typeof price === "string") {
      return Number(
        price
          .replace("R$", "")
          .replace(/\./g, "")
          .replace(",", ".")
          .trim()
      ) || 0;
    }
    return Number(price) || 0;
  }

  // ✅ ADD CORRIGIDO
  function addToCart(product) {
    setCart((prev) => {
      const exists = prev.find(item => item.id === product.id);

      const quantityToAdd = product.quantity || 1;

      if (exists) {
        return prev.map(item =>
          item.id === product.id
            ? {
                ...item,
                quantity: (item.quantity || 1) + quantityToAdd
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: quantityToAdd,
          price: normalizePrice(product.price) // 🔥 evita NaN
        }
      ];
    });

    setOpenCart(true);
  }

  // ✅ REMOVER
  function removeItem(id) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

  // ✅ AUMENTAR
  function increase(id) {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  }

  // ✅ DIMINUIR
  function decrease(id) {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: (item.quantity || 1) - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }

  // 🔥 TOTAL SEGURO
  const total = cart.reduce((acc, item) => {
    const price = normalizePrice(item.price);
    const quantity = item.quantity || 1;

    return acc + price * quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeItem,
        increase,
        decrease,
        total,
        openCart,
        setOpenCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}