// LUXE COUTURE - Global State Management

const CURRENCY_RATES = {
  USD: { symbol: "$", rate: 1.0, format: (val) => `$${val.toLocaleString()}` },
  PKR: { symbol: "₨", rate: 278.5, format: (val) => `Rs ${Math.round(val * 278.5).toLocaleString()}` },
  EUR: { symbol: "€", rate: 0.92, format: (val) => `€${Math.round(val * 0.92).toLocaleString()}` },
  GBP: { symbol: "£", rate: 0.79, format: (val) => `£${Math.round(val * 0.79).toLocaleString()}` },
  AED: { symbol: "د.إ", rate: 3.67, format: (val) => `AED ${Math.round(val * 3.67).toLocaleString()}` }
};

class AppState {
  constructor() {
    this.currency = localStorage.getItem("lc_currency") || "USD";
    this.theme = localStorage.getItem("lc_theme") || "light";
    this.cart = JSON.parse(localStorage.getItem("lc_cart") || "[]");
    this.wishlist = JSON.parse(localStorage.getItem("lc_wishlist") || "[]");
    
    this.currentView = "home";
    this.activeFilters = {
      origin: "all",
      category: "all",
      gender: "all",
      minPrice: 0,
      maxPrice: 1000,
      search: "",
      sortBy: "featured" // 'featured', 'price-low', 'price-high', 'rating', 'newest'
    };

    this.appliedPromo = null; // { code: 'LUXE20', discountPercent: 20 }
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach((fn) => fn(this));
  }

  // --- CURRENCY ---
  setCurrency(currCode) {
    if (CURRENCY_RATES[currCode]) {
      this.currency = currCode;
      localStorage.setItem("lc_currency", currCode);
      this.notify();
    }
  }

  formatPrice(usdAmount) {
    const config = CURRENCY_RATES[this.currency] || CURRENCY_RATES.USD;
    return config.format(usdAmount);
  }

  // --- THEME ---
  toggleTheme() {
    this.theme = this.theme === "light" ? "dark" : "light";
    localStorage.setItem("lc_theme", this.theme);
    document.documentElement.setAttribute("data-theme", this.theme);
    this.notify();
  }

  // --- CART ---
  addToCart(product, selectedSize, selectedColor, quantity = 1) {
    const existingIndex = this.cart.findIndex(
      (item) => item.id === product.id && item.size === selectedSize && item.color.name === selectedColor.name
    );

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        origin: product.origin,
        priceUSD: product.priceUSD,
        originalPriceUSD: product.originalPriceUSD,
        image: product.images[0],
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
        maxStock: product.stock
      });
    }

    this.saveCart();
    this.notify();
  }

  updateCartQuantity(index, quantity) {
    if (quantity <= 0) {
      this.removeFromCart(index);
      return;
    }
    if (this.cart[index]) {
      this.cart[index].quantity = Math.min(quantity, this.cart[index].maxStock || 99);
      this.saveCart();
      this.notify();
    }
  }

  removeFromCart(index) {
    this.cart.splice(index, 1);
    this.saveCart();
    this.notify();
  }

  clearCart() {
    this.cart = [];
    this.appliedPromo = null;
    this.saveCart();
    this.notify();
  }

  saveCart() {
    localStorage.setItem("lc_cart", JSON.stringify(this.cart));
  }

  getCartSubtotalUSD() {
    return this.cart.reduce((sum, item) => sum + item.priceUSD * item.quantity, 0);
  }

  getCartDiscountUSD() {
    if (!this.appliedPromo) return 0;
    const subtotal = this.getCartSubtotalUSD();
    return (subtotal * this.appliedPromo.discountPercent) / 100;
  }

  getCartTotalUSD() {
    const subtotal = this.getCartSubtotalUSD();
    const discount = this.getCartDiscountUSD();
    const shipping = subtotal > 200 || subtotal === 0 ? 0 : 25; // Free shipping over $200
    return Math.max(0, subtotal - discount + shipping);
  }

  getCartCount() {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  // --- WISHLIST ---
  toggleWishlist(productId) {
    const index = this.wishlist.indexOf(productId);
    if (index > -1) {
      this.wishlist.splice(index, 1);
    } else {
      this.wishlist.push(productId);
    }
    localStorage.setItem("lc_wishlist", JSON.stringify(this.wishlist));
    this.notify();
    return this.isInWishlist(productId);
  }

  isInWishlist(productId) {
    return this.wishlist.includes(productId);
  }

  // --- FILTERS & ROUTING ---
  setFilter(key, value) {
    this.activeFilters[key] = value;
    this.notify();
  }

  resetFilters() {
    this.activeFilters = {
      origin: "all",
      category: "all",
      gender: "all",
      minPrice: 0,
      maxPrice: 1000,
      search: "",
      sortBy: "featured"
    };
    this.notify();
  }

  setView(viewName) {
    this.currentView = viewName;
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.notify();
  }
}

// Global instance
const state = new AppState();
