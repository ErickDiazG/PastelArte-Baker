export const CartStore = {
  getCart() {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem('pastelarte-cart') || '[]');
  },

  setCart(cart) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('pastelarte-cart', JSON.stringify(cart));
    // Notificamos a todos los componentes que escuchan el evento
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
  },

  addItem(item) {
    const cart = this.getCart();
    const existing = cart.find(i => i.name === item.name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    this.setCart(cart);
  },

  removeItem(name) {
    let cart = this.getCart();
    cart = cart.filter(i => i.name !== name);
    this.setCart(cart);
  },

  updateQuantity(name, delta) {
    let cart = this.getCart();
    const item = cart.find(i => i.name === name);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        cart = cart.filter(i => i.name !== name);
      }
    }
    this.setCart(cart);
  },

  clearCart() {
    this.setCart([]);
  },
  
  getTotalItems() {
    return this.getCart().reduce((sum, item) => sum + item.quantity, 0);
  },
  
  formatWhatsAppOrder() {
    const cart = this.getCart();
    if (cart.length === 0) return "";
    
    let text = "¡Hola PastelArte! Me gustaría pedir lo siguiente:%0A%0A";
    cart.forEach(item => {
      text += `- ${item.quantity}x ${item.name}%0A`;
    });
    
    return `https://wa.me/528994719925?text=${text}`;
  }
};
