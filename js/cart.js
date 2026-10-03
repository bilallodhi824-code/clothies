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
      overlay.addEventListener("click", () => UI.closeCartDrawer());
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
    }
  },

  applyPromoCode(code) {
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
      UI.showToast("Invalid promotion code. Try 'LUXE20'", "error");
    }
  },

  renderDrawer() {
    const drawer = document.getElementById("cart-drawer");
    if (!drawer) return;

    // Update cart badge counts across navbar
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
      if (emptyState) emptyState.style.display = "block";
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
              <span class="item-origin">${item.origin}</span>
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
                <button class="cart-qty-btn minus" data-index="${index}">-</button>
                <span class="cart-qty-num">${item.quantity}</span>
                <button class="cart-qty-btn plus" data-index="${index}">+</button>
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
          state.updateCartQuantity(idx, state.cart[idx].quantity + 1);
        });
      });
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
