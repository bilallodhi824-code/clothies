// LUXE COUTURE - Cart Drawer & Coupon Engine

const CartEngine = {
  init() {
    state.subscribe(() => this.renderDrawer());
    this.attachEventListeners();
    this.renderDrawer();
  },

  attachEventListeners() {
    const drawer = document.getElementById("cart-drawer");
    if (!drawer) return;

    const closeBtn = drawer.querySelector(".drawer-close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => UI.closeCartDrawer());
    }

    const overlay = document.getElementById("drawer-overlay");
    if (overlay) {
      overlay.addEventListener("click", () => {
        UI.closeCartDrawer();
        UI.closeMobileNav();
      });
    }

    const checkoutBtn = drawer.querySelector("#drawer-checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        UI.openCheckoutModal();
      });
    }

    const promoApplyBtn = drawer.querySelector("#apply-promo-btn");
    const promoInput = drawer.querySelector("#promo-code-input");
    if (promoApplyBtn && promoInput) {
      promoApplyBtn.addEventListener("click", () => {
        const code = promoInput.value.trim().toUpperCase();
        this.applyPromoCode(code);
      });
      promoInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const code = promoInput.value.trim().toUpperCase();
          this.applyPromoCode(code);
        }
      });
    }
  },

  applyPromoCode(code) {
    if (!code) {
      UI.showToast("Please enter a promotion code", "error");
      return;
    }
    const validCodes = {
      LUXE20: 20,
      EID2026: 25,
      ROYAL15: 15,
      WELCOME10: 10
    };

    if (validCodes[code]) {
      state.appliedPromo = { code: code, discountPercent: validCodes[code] };
      state.notify();
      UI.showToast(`Promo "${code}" applied! You saved ${validCodes[code]}%`, "success");
    } else {
      UI.showToast("Invalid promotion code. Try 'LUXE20' or 'EID2026'", "error");
    }
  },

  removePromoCode() {
    state.appliedPromo = null;
    state.notify();
    UI.showToast("Promo voucher removed", "info");
  },

  renderDrawer() {
    const drawer = document.getElementById("cart-drawer");
    if (!drawer) return;

    // Update cart badge counts across navbar & mobile drawer
    const cartCount = state.getCartCount();
    document.querySelectorAll(".cart-badge-count").forEach((el) => {
      el.textContent = cartCount;
      el.style.display = cartCount > 0 ? "inline-flex" : "none";
    });

    const itemsContainer = drawer.querySelector(".drawer-items-list");
    const emptyState = drawer.querySelector(".drawer-empty-state");
    const footerContainer = drawer.querySelector(".drawer-footer");
    const shippingProgress = drawer.querySelector(".free-shipping-progress");

    if (state.cart.length === 0) {
      if (itemsContainer) itemsContainer.innerHTML = "";
      if (emptyState) {
        emptyState.style.display = "flex";
        emptyState.innerHTML = `
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <h4>Your bag is empty</h4>
          <p>Discover our latest haute couture runway collections.</p>
          <button class="btn btn-primary" id="btn-empty-cart-shop" style="margin-top: 1rem;">Explore Runway Catalog</button>
        `;
        const shopBtn = emptyState.querySelector("#btn-empty-cart-shop");
        if (shopBtn) {
          shopBtn.addEventListener("click", () => {
            UI.closeCartDrawer();
            state.setView("shop");
          });
        }
      }
      if (footerContainer) footerContainer.style.display = "none";
      if (shippingProgress) shippingProgress.style.display = "none";
      return;
    }

    if (emptyState) emptyState.style.display = "none";
    if (footerContainer) footerContainer.style.display = "block";
    if (shippingProgress) shippingProgress.style.display = "block";

    // Free shipping threshold ($200)
    const subtotal = state.getCartSubtotalUSD();
    const threshold = 200;
    const progressPercent = Math.min(100, Math.round((subtotal / threshold) * 100));
    const remaining = Math.max(0, threshold - subtotal);

    if (shippingProgress) {
      shippingProgress.innerHTML = `
        <div class="progress-label">
          ${remaining === 0 
            ? `<span>✨ Congratulations! You unlocked <strong>Complimentary Express Shipping</strong>!</span>` 
            : `<span>Add <strong>${state.formatPrice(remaining)}</strong> more to unlock Free Express Worldwide Delivery</span>`
          }
        </div>
        <div class="progress-bar-track">
          <div class="progress-bar-fill" style="width: ${progressPercent}%;"></div>
        </div>
      `;
    }

    if (itemsContainer) {
      itemsContainer.innerHTML = state.cart.map((item, index) => `
        <div class="drawer-item-card">
          <div class="item-thumb">
            <img src="${item.image}" alt="${item.name}" />
          </div>
          <div class="item-info">
            <div class="item-header-row">
              <span class="item-origin">${item.origin} Haute</span>
              <button class="item-remove-btn" data-index="${index}" title="Remove item">&times;</button>
            </div>
            <h5 class="item-title">${item.name}</h5>
            <div class="item-specs">
              <span>Size: <strong>${item.size}</strong></span>
              <span>Color: <span class="color-dot" style="background:${item.color.hex}"></span> <strong>${item.color.name}</strong></span>
            </div>
            <div class="item-price-quantity-row">
              <span class="item-price">${state.formatPrice(item.priceUSD * item.quantity)}</span>
              <div class="item-qty-control">
                <button class="cart-qty-btn minus" data-index="${index}" title="Decrease quantity">-</button>
                <span class="cart-qty-num">${item.quantity}</span>
                <button class="cart-qty-btn plus" data-index="${index}" title="Increase quantity">+</button>
              </div>
            </div>
          </div>
        </div>
      `).join('');

      // Attach item actions
      itemsContainer.querySelectorAll(".item-remove-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-index"));
          state.removeFromCart(idx);
          UI.showToast("Item removed from bag", "info");
        });
      });

      itemsContainer.querySelectorAll(".cart-qty-btn.minus").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-index"));
          state.updateCartQuantity(idx, state.cart[idx].quantity - 1);
        });
      });

      itemsContainer.querySelectorAll(".cart-qty-btn.plus").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-index"));
          const item = state.cart[idx];
          if (item.quantity >= item.maxStock) {
            UI.showToast(`Only ${item.maxStock} pieces available in atelier for this size`, "info");
            return;
          }
          state.updateCartQuantity(idx, item.quantity + 1);
        });
      });
    }

    // Dynamic Promo Section in Footer
    const promoRow = drawer.querySelector(".promo-input-row");
    if (promoRow) {
      if (state.appliedPromo) {
        promoRow.innerHTML = `
          <div class="applied-promo-badge">
            <span>🎟️ <strong>${state.appliedPromo.code}</strong> (${state.appliedPromo.discountPercent}% OFF)</span>
            <button class="btn-remove-promo" id="remove-promo-action" title="Remove promo">&times;</button>
          </div>
        `;
        const removeBtn = promoRow.querySelector("#remove-promo-action");
        if (removeBtn) {
          removeBtn.addEventListener("click", () => this.removePromoCode());
        }
      } else {
        promoRow.innerHTML = `
          <div class="promo-box-layout">
            <div class="promo-input-flex">
              <input type="text" id="promo-code-input" placeholder="Promo Code (e.g. LUXE20)" />
              <button class="btn btn-outline" id="apply-promo-btn" style="padding: 0.5rem 1rem;">Apply</button>
            </div>
            <div class="quick-promo-tags">
              <button class="quick-promo-pill" data-code="LUXE20">LUXE20 (-20%)</button>
              <button class="quick-promo-pill" data-code="EID2026">EID2026 (-25%)</button>
            </div>
          </div>
        `;
        const applyBtn = promoRow.querySelector("#apply-promo-btn");
        const pInput = promoRow.querySelector("#promo-code-input");
        if (applyBtn && pInput) {
          applyBtn.addEventListener("click", () => this.applyPromoCode(pInput.value.trim().toUpperCase()));
          pInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              this.applyPromoCode(pInput.value.trim().toUpperCase());
            }
          });
        }
        promoRow.querySelectorAll(".quick-promo-pill").forEach((pill) => {
          pill.addEventListener("click", () => {
            const code = pill.getAttribute("data-code");
            this.applyPromoCode(code);
          });
        });
      }
    }

    // Update Totals
    const discount = state.getCartDiscountUSD();
    const total = state.getCartTotalUSD();
    const shipping = subtotal > 200 || subtotal === 0 ? 0 : 25;

    const subtotalEl = drawer.querySelector("#drawer-subtotal-val");
    if (subtotalEl) subtotalEl.textContent = state.formatPrice(subtotal);

    const discountRow = drawer.querySelector("#drawer-discount-row");
    const discountVal = drawer.querySelector("#drawer-discount-val");
    if (discountRow && discountVal) {
      if (state.appliedPromo && discount > 0) {
        discountRow.style.display = "flex";
        discountVal.textContent = `-${state.formatPrice(discount)} (${state.appliedPromo.code})`;
      } else {
        discountRow.style.display = "none";
      }
    }

    const shippingVal = drawer.querySelector("#drawer-shipping-val");
    if (shippingVal) {
      shippingVal.innerHTML = shipping === 0 ? `<span class="badge-free">FREE</span>` : state.formatPrice(shipping);
    }

    const totalEl = drawer.querySelector("#drawer-total-val");
    if (totalEl) totalEl.textContent = state.formatPrice(total);
  }
};
