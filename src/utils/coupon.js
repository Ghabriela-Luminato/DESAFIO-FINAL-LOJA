export function applyCoupon(code, subtotal) {
  if (!code) return { discount: 0, valid: false };

  if (code.toLowerCase() === "panda10") {
    return {
      discount: subtotal * 0.15,
      valid: true,
      message: "Cupom aplicado (15% OFF)"
    };
  }

  return {
    discount: 0,
    valid: false,
    message: "Cupom inválido"
  };
}