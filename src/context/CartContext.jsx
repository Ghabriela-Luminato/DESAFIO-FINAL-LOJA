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


  function addToCart(product) {
    setCart((prev) => {
      const exists = prev.find(item => item.id === product.id);

      if (exists) {
        return prev.map(item =>
          item.id === product.id
            ? {
                ...item,
                quantity: (item.quantity || 1) + 1 // 🔥 nunca quebra
              }
            : item
        );
      }

      
      return [...prev, { ...product, quantity: 1 }];
    });

    setOpenCart(true);
  }


  function removeItem(id) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

 
  function increase(id) {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  }


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

  const total = cart.reduce(
    (acc, item) =>
      acc + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );

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