// LUXE COUTURE - UI Components & Interactive Modules

const UI = {
  // Store customer & order details for seamless receipt generation
  lastOrder: null,
  activeSizeUnit: "in",

  // --- TOAST NOTIFICATIONS ---
  showToast(message, type = "success", duration = 3500) {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast-item toast-${type}`;
    
    let iconSvg = "";
    if (type === "success") {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    } else if (type === "info") {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    } else {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
    }

    toast.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <div class="toast-content">${message}</div>
      <button class="toast-close" aria-label="Close Notification">&times;</button>
    `;

    toast.querySelector(".toast-close").addEventListener("click", () => {
      toast.classList.add("toast-fade-out");
      setTimeout(() => toast.remove(), 300);
    });

    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.classList.add("toast-fade-out");
        setTimeout(() => toast.remove(), 300);
      }
    }, duration);
  },

  // --- MOBILE NAVIGATION DRAWER ---
  openMobileNav() {
    const mobileDrawer = document.getElementById("mobile-nav-drawer");
    const overlay = document.getElementById("drawer-overlay");
    if (mobileDrawer && overlay) {
      mobileDrawer.classList.add("drawer-open");
      overlay.classList.add("overlay-active");
      document.body.classList.add("modal-open");
    }
  },

  closeMobileNav() {
    const mobileDrawer = document.getElementById("mobile-nav-drawer");
    const overlay = document.getElementById("drawer-overlay");
    if (mobileDrawer) {
      mobileDrawer.classList.remove("drawer-open");
    }
    // Only remove overlay if cart drawer is also not open
    const cartDrawer = document.getElementById("cart-drawer");
    const isCartOpen = cartDrawer && cartDrawer.classList.contains("drawer-open");
    if (overlay && !isCartOpen) {
      overlay.classList.remove("overlay-active");
      document.body.classList.remove("modal-open");
    }
  },

  // --- PRODUCT DETAIL MODAL ---
  openProductModal(productId) {
    const product = PRODUCTS_DATA.find((p) => p.id === productId);
    if (!product) return;

    let modal = document.getElementById("product-modal");
    if (!modal) return;

    let selectedSize = product.sizes[0];
    let selectedColor = product.colors[0];
    let currentQty = 1;
    let activeImageIndex = 0;

    const modalBody = modal.querySelector(".modal-body-content");
    
    function renderModalContent() {
      const discountPercentage = product.originalPriceUSD 
        ? Math.round(((product.originalPriceUSD - product.priceUSD) / product.originalPriceUSD) * 100) 
        : 0;

      modalBody.innerHTML = `
        <div class="product-modal-grid">
          <!-- Gallery Column -->
          <div class="modal-gallery">
            <div class="main-image-viewport">
              <img id="modal-main-img" src="${product.images[activeImageIndex]}" alt="${product.name}" class="main-zoomable-img" onerror="this.src='https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80'" />
              ${product.badge ? `<span class="product-badge-luxury">${product.badge}</span>` : ""}
              <button class="modal-wishlist-btn ${state.isInWishlist(product.id) ? 'active' : ''}" id="modal-wish-btn" title="Add to Wishlist" aria-label="Add to Wishlist">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="${state.isInWishlist(product.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
            </div>
            <div class="modal-thumbnails">
              ${product.images.map((img, idx) => `
                <button class="thumbnail-btn ${idx === activeImageIndex ? 'active' : ''}" data-idx="${idx}" aria-label="Product Image ${idx + 1}">
                  <img src="${img}" alt="${product.name} angle ${idx + 1}" onerror="this.src='https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=300&q=80'" />
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Details Column -->
          <div class="modal-details">
            <div class="modal-origin-tag">
              <span class="flag-pill">${product.origin} Haute Collection</span>
              <span class="category-pill">${product.category}</span>
            </div>
            
            <h2 class="modal-product-title">${product.name}</h2>
            
            <div class="modal-pricing-row">
              <span class="modal-price-current">${state.formatPrice(product.priceUSD)}</span>
              ${product.originalPriceUSD ? `<span class="modal-price-original">${state.formatPrice(product.originalPriceUSD)}</span>` : ""}
              ${discountPercentage > 0 ? `<span class="modal-discount-tag">${discountPercentage}% OFF</span>` : ""}
            </div>

            <div class="modal-ratings-row">
              <div class="stars-gold">
                ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span class="rating-num">${product.rating}</span>
              <span class="review-count">(${product.reviewsCount} verified atelier reviews)</span>
            </div>

            <p class="modal-description">${product.description}</p>

            <!-- Color Swatches -->
            <div class="modal-option-group">
              <div class="option-header">
                <span class="option-label">Color Hue:</span>
                <span class="option-selected-name" id="selected-color-name">${selectedColor.name}</span>
              </div>
              <div class="color-swatches-list">
                ${product.colors.map((c) => `
                  <button class="swatch-btn ${c.name === selectedColor.name ? 'active' : ''}" 
                          data-color-name="${c.name}" 
                          style="background-color: ${c.hex};" 
                          title="${c.name}"
                          aria-label="${c.name}">
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Size Selector -->
            <div class="modal-option-group">
              <div class="option-header">
                <span class="option-label">Select Size:</span>
                <button class="size-guide-trigger" id="open-size-guide-btn" type="button">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.3 8.7 8.7 21.3c-1 1-2.5 1-3.4 0l-2.6-2.6c-1-1-1-2.5 0-3.4L15.3 2.7c1-1 2.5-1 3.4 0l2.6 2.6c1 1 1 2.4 0 3.4Z"/></svg>
                  Size & Fit Guide
                </button>
              </div>
              <div class="size-chips-list">
                ${product.sizes.map((s) => `
                  <button class="size-chip-btn ${s === selectedSize ? 'active' : ''}" data-size="${s}">${s}</button>
                `).join('')}
              </div>
              <div id="custom-size-notice" class="custom-size-notice" style="display: ${selectedSize === 'Custom' ? 'block' : 'none'};">
                ✨ <strong>Bespoke Tailoring:</strong> Our master artisan will reach out via WhatsApp/Email to consult on your bespoke measurements.
              </div>
            </div>

            <!-- Stock Status -->
            <div class="stock-status-bar">
              <span class="pulse-indicator"></span>
              <span>Available: <strong>${product.stock}</strong> pieces in atelier atelier collection</span>
            </div>

            <!-- Quantity & Actions -->
            <div class="modal-actions-row">
              <div class="qty-stepper">
                <button class="qty-btn" id="modal-qty-minus" aria-label="Decrease quantity">-</button>
                <span class="qty-val" id="modal-qty-val">${currentQty}</span>
                <button class="qty-btn" id="modal-qty-plus" aria-label="Increase quantity">+</button>
              </div>
              <button class="btn btn-primary btn-add-cart" id="modal-add-cart-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                Add To Shopping Bag
              </button>
              <button class="btn btn-gold btn-buy-now" id="modal-buy-now-btn">Buy Now</button>
            </div>

            <!-- Fabric & Care Accordion -->
            <div class="product-specs-accordion">
              <div class="spec-item">
                <strong>Fabric Composition:</strong> ${product.fabric}
              </div>
              <div class="spec-item">
                <strong>Craftsmanship Highlights:</strong>
                <ul class="spec-bullets">
                  ${product.details.map((d) => `<li>${d}</li>`).join('')}
                </ul>
              </div>
              <div class="spec-item-perks">
                <div class="perk-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                  <span>Complimentary express global shipping over $200</span>
                </div>
                <div class="perk-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span>100% Authentic Hand-Tailored Guarantee</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      `;

      // Smooth Thumbnail Switcher
      const mainImg = modalBody.querySelector("#modal-main-img");
      modalBody.querySelectorAll(".thumbnail-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          activeImageIndex = parseInt(btn.getAttribute("data-idx"));
          modalBody.querySelectorAll(".thumbnail-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          if (mainImg) {
            mainImg.style.opacity = "0.3";
            setTimeout(() => {
              mainImg.src = product.images[activeImageIndex];
              mainImg.style.opacity = "1";
            }, 100);
          }
        });
      });

      // Smooth Swatch Switcher
      modalBody.querySelectorAll(".swatch-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const cName = btn.getAttribute("data-color-name");
          selectedColor = product.colors.find((c) => c.name === cName) || product.colors[0];
          modalBody.querySelectorAll(".swatch-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          const nameLabel = modalBody.querySelector("#selected-color-name");
          if (nameLabel) nameLabel.textContent = selectedColor.name;
        });
      });

      // Size chip switcher
      const customNotice = modalBody.querySelector("#custom-size-notice");
      modalBody.querySelectorAll(".size-chip-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          selectedSize = btn.getAttribute("data-size");
          modalBody.querySelectorAll(".size-chip-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          if (customNotice) {
            customNotice.style.display = selectedSize === "Custom" ? "block" : "none";
          }
        });
      });

      modalBody.querySelector("#modal-qty-minus").addEventListener("click", () => {
        if (currentQty > 1) {
          currentQty--;
          modalBody.querySelector("#modal-qty-val").textContent = currentQty;
        }
      });

      modalBody.querySelector("#modal-qty-plus").addEventListener("click", () => {
        if (currentQty < product.stock) {
          currentQty++;
          modalBody.querySelector("#modal-qty-val").textContent = currentQty;
        } else {
          UI.showToast(`Maximum atelier availability is ${product.stock} pieces`, "info");
        }
      });

      modalBody.querySelector("#modal-wish-btn").addEventListener("click", () => {
        const isNowIn = state.toggleWishlist(product.id);
        UI.showToast(isNowIn ? `Added "${product.name}" to your Wishlist` : `Removed from Wishlist`, "info");
        const heartBtn = modalBody.querySelector("#modal-wish-btn");
        if (heartBtn) {
          heartBtn.classList.toggle("active", isNowIn);
          heartBtn.querySelector("svg").setAttribute("fill", isNowIn ? "currentColor" : "none");
        }
      });

      modalBody.querySelector("#open-size-guide-btn").addEventListener("click", () => {
        UI.openSizeGuideModal();
      });

      modalBody.querySelector("#modal-add-cart-btn").addEventListener("click", () => {
        const result = state.addToCart(product, selectedSize, selectedColor, currentQty);
        if (result && result.maxReached) {
          UI.showToast(`Already at maximum atelier stock (${result.maxStock}) in your bag`, "info");
        } else {
          UI.showToast(`Added ${currentQty}x "${product.name}" (${selectedSize}, ${selectedColor.name}) to your Bag!`, "success");
        }
        UI.openCartDrawer();
      });

      modalBody.querySelector("#modal-buy-now-btn").addEventListener("click", () => {
        state.addToCart(product, selectedSize, selectedColor, currentQty);
        UI.closeProductModal();
        UI.openCheckoutModal();
      });
    }

    renderModalContent();
    modal.classList.add("modal-active");
    document.body.classList.add("modal-open");
  },

  closeProductModal() {
    const modal = document.getElementById("product-modal");
    if (modal) {
      modal.classList.remove("modal-active");
      document.body.classList.remove("modal-open");
    }
  },

  // --- SIZE GUIDE MODAL ---
  openSizeGuideModal() {
    let guideModal = document.getElementById("size-guide-modal");
    if (guideModal) {
      guideModal.classList.add("modal-active");
      document.body.classList.add("modal-open");
      this.renderSizeGuideTables();
    }
  },

  closeSizeGuideModal() {
    let guideModal = document.getElementById("size-guide-modal");
    if (guideModal) {
      guideModal.classList.remove("modal-active");
      // Check if product modal is open
      const pModal = document.getElementById("product-modal");
      if (!pModal || !pModal.classList.contains("modal-active")) {
        document.body.classList.remove("modal-open");
      }
    }
  },

  renderSizeGuideTables() {
    const tableWrap = document.querySelector("#size-guide-modal .size-table-wrap");
    if (!tableWrap) return;

    const isInch = this.activeSizeUnit === "in";
    tableWrap.innerHTML = `
      <div class="size-unit-toggle">
        <button class="unit-btn ${isInch ? 'active' : ''}" id="btn-unit-in">Inches (in)</button>
        <button class="unit-btn ${!isInch ? 'active' : ''}" id="btn-unit-cm">Centimeters (cm)</button>
      </div>
      <table class="luxury-table">
        <thead>
          <tr>
            <th>Standard</th>
            <th>US / CA</th>
            <th>UK / AU</th>
            <th>EU</th>
            <th>Bust (${isInch ? 'in' : 'cm'})</th>
            <th>Waist (${isInch ? 'in' : 'cm'})</th>
            <th>Hips (${isInch ? 'in' : 'cm'})</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>XS</strong></td>
            <td>0 - 2</td>
            <td>4 - 6</td>
            <td>32 - 34</td>
            <td>${isInch ? '32 - 33"' : '81 - 84 cm'}</td>
            <td>${isInch ? '24 - 25"' : '61 - 64 cm'}</td>
            <td>${isInch ? '34 - 35"' : '86 - 89 cm'}</td>
          </tr>
          <tr>
            <td><strong>S</strong></td>
            <td>4 - 6</td>
            <td>8 - 10</td>
            <td>36 - 38</td>
            <td>${isInch ? '34 - 35"' : '86 - 89 cm'}</td>
            <td>${isInch ? '26 - 27"' : '66 - 69 cm'}</td>
            <td>${isInch ? '36 - 37"' : '91 - 94 cm'}</td>
          </tr>
          <tr>
            <td><strong>M</strong></td>
            <td>8 - 10</td>
            <td>12 - 14</td>
            <td>40 - 42</td>
            <td>${isInch ? '36 - 37"' : '91 - 94 cm'}</td>
            <td>${isInch ? '28 - 29"' : '71 - 74 cm'}</td>
            <td>${isInch ? '38 - 39"' : '97 - 99 cm'}</td>
          </tr>
          <tr>
            <td><strong>L</strong></td>
            <td>12 - 14</td>
            <td>16 - 18</td>
            <td>44 - 46</td>
            <td>${isInch ? '38 - 40"' : '97 - 102 cm'}</td>
            <td>${isInch ? '30 - 32"' : '76 - 81 cm'}</td>
            <td>${isInch ? '40 - 42"' : '102 - 107 cm'}</td>
          </tr>
          <tr>
            <td><strong>XL</strong></td>
            <td>16</td>
            <td>20</td>
            <td>48</td>
            <td>${isInch ? '41 - 43"' : '104 - 109 cm'}</td>
            <td>${isInch ? '33 - 35"' : '84 - 89 cm'}</td>
            <td>${isInch ? '43 - 45"' : '109 - 114 cm'}</td>
          </tr>
        </tbody>
      </table>
    `;

    const inBtn = tableWrap.querySelector("#btn-unit-in");
    const cmBtn = tableWrap.querySelector("#btn-unit-cm");
    if (inBtn && cmBtn) {
      inBtn.addEventListener("click", () => {
        this.activeSizeUnit = "in";
        this.renderSizeGuideTables();
      });
      cmBtn.addEventListener("click", () => {
        this.activeSizeUnit = "cm";
        this.renderSizeGuideTables();
      });
    }
  },

  // --- CART DRAWER ---
  openCartDrawer() {
    const drawer = document.getElementById("cart-drawer");
    const overlay = document.getElementById("drawer-overlay");
    if (drawer && overlay) {
      drawer.classList.add("drawer-open");
      overlay.classList.add("overlay-active");
      document.body.classList.add("modal-open");
    }
  },

  closeCartDrawer() {
    const drawer = document.getElementById("cart-drawer");
    const overlay = document.getElementById("drawer-overlay");
    if (drawer && overlay) {
      drawer.classList.remove("drawer-open");
      overlay.classList.remove("overlay-active");
      document.body.classList.remove("modal-open");
    }
  },

  // --- CHECKOUT MODAL ---
  openCheckoutModal() {
    UI.closeCartDrawer();
    const modal = document.getElementById("checkout-modal");
    if (!modal) return;

    if (state.cart.length === 0) {
      UI.showToast("Your shopping bag is empty! Add pieces to proceed.", "error");
      return;
    }

    modal.classList.add("modal-active");
    document.body.classList.add("modal-open");
    this.renderCheckoutWizard(1);
  },

  closeCheckoutModal() {
    const modal = document.getElementById("checkout-modal");
    if (modal) {
      modal.classList.remove("modal-active");
      document.body.classList.remove("modal-open");
    }
  },

  // Renders Multi-Step Checkout Wizard with full order tracking
  renderCheckoutWizard(step = 1, completedOrder = null) {
    const container = document.getElementById("checkout-wizard-container");
    if (!container) return;

    // Use current cart totals for steps 1 and 2; use completedOrder totals for step 3
    const isStep3 = step === 3 && completedOrder;
    const subtotal = isStep3 ? completedOrder.subtotal : state.getCartSubtotalUSD();
    const discount = isStep3 ? completedOrder.discount : state.getCartDiscountUSD();
    const total = isStep3 ? completedOrder.total : state.getCartTotalUSD();
    const shipping = isStep3 ? completedOrder.shipping : (subtotal > 200 || subtotal === 0 ? 0 : 25);
    const promoCode = isStep3 ? completedOrder.promo?.code : state.appliedPromo?.code;
    const orderItems = isStep3 ? completedOrder.items : state.cart;
    const itemCount = isStep3 ? completedOrder.items.reduce((acc, i) => acc + i.quantity, 0) : state.getCartCount();

    container.innerHTML = `
      <div class="checkout-steps-bar">
        <div class="step-indicator ${step >= 1 ? 'active' : ''}"><span>1</span> Shipping Address</div>
        <div class="step-line ${step >= 2 ? 'active' : ''}"></div>
        <div class="step-indicator ${step >= 2 ? 'active' : ''}"><span>2</span> Payment Method</div>
        <div class="step-line ${step >= 3 ? 'active' : ''}"></div>
        <div class="step-indicator ${step >= 3 ? 'active' : ''}"><span>3</span> Atelier Confirmation</div>
      </div>

      <div class="checkout-layout-grid">
        <div class="checkout-form-column">
          ${step === 1 ? `
            <form id="shipping-form" class="checkout-form">
              <h3 class="form-section-title">Shipping & Courier Destination</h3>
              <div class="form-row-2">
                <div class="form-field">
                  <label for="chk-fname">First Name *</label>
                  <input type="text" id="chk-fname" placeholder="Fatima" required value="Fatima" />
                </div>
                <div class="form-field">
                  <label for="chk-lname">Last Name *</label>
                  <input type="text" id="chk-lname" placeholder="Khan" required value="Ahmed" />
                </div>
              </div>
              <div class="form-field">
                <label for="chk-email">Email Address for Tracking & Receipts *</label>
                <input type="email" id="chk-email" placeholder="client@luxecouture.com" required value="fatima.ahmed@luxecouture.com" />
              </div>
              <div class="form-field">
                <label for="chk-phone">Phone / WhatsApp for Delivery Coordination *</label>
                <input type="tel" id="chk-phone" placeholder="+92 300 1234567 / +1 212 555 0199" required value="+92 300 8472910" />
              </div>
              <div class="form-field">
                <label for="chk-address">Street Address / Suite / Apartment *</label>
                <input type="text" id="chk-address" placeholder="House 42, Block G, Gulberg III / 5th Ave, NY" required value="Suite 14, 5th Avenue Boulevard" />
              </div>
              <div class="form-row-3">
                <div class="form-field">
                  <label for="chk-city">City *</label>
                  <input type="text" id="chk-city" placeholder="Lahore / New York" required value="Lahore" />
                </div>
                <div class="form-field">
                  <label for="chk-state">State / Province</label>
                  <input type="text" id="chk-state" placeholder="Punjab / NY" value="Punjab" />
                </div>
                <div class="form-field">
                  <label for="chk-zip">Postal / Zip Code</label>
                  <input type="text" id="chk-zip" placeholder="54000 / 10001" value="54000" />
                </div>
              </div>
              <div class="form-field">
                <label for="chk-country">Country / Region *</label>
                <select id="chk-country" class="custom-select">
                  <option value="Pakistan" selected>Pakistan 🇵🇰</option>
                  <option value="United States">United States 🇺🇸</option>
                  <option value="United Kingdom">United Kingdom 🇬🇧</option>
                  <option value="United Arab Emirates">United Arab Emirates 🇦🇪</option>
                  <option value="Canada">Canada 🇨🇦</option>
                  <option value="France">France 🇫🇷</option>
                  <option value="Saudi Arabia">Saudi Arabia 🇸🇦</option>
                </select>
              </div>
              <div class="form-actions">
                <button type="submit" class="btn btn-primary btn-block">Continue to Payment Selection &rarr;</button>
              </div>
            </form>
          ` : step === 2 ? `
            <form id="payment-form" class="checkout-form">
              <h3 class="form-section-title">Select Payment Method</h3>
              <div class="payment-options-list">
                <label class="payment-method-card selected" data-method="card">
                  <input type="radio" name="payment_method" value="card" checked />
                  <div class="method-info">
                    <strong>Credit / Debit Card (Stripe Encrypted)</strong>
                    <span>Visa, Mastercard, American Express, UnionPay</span>
                  </div>
                  <div class="method-icons">💳</div>
                </label>
                <label class="payment-method-card" data-method="cod">
                  <input type="radio" name="payment_method" value="cod" />
                  <div class="method-info">
                    <strong>Cash on Delivery (Pakistan & UAE)</strong>
                    <span>Pay in cash directly upon doorstep courier arrival</span>
                  </div>
                  <div class="method-icons">💵</div>
                </label>
                <label class="payment-method-card" data-method="apple_pay">
                  <input type="radio" name="payment_method" value="apple_pay" />
                  <div class="method-info">
                    <strong>Apple Pay / Google Pay</strong>
                    <span>Biometric 1-touch luxury checkout</span>
                  </div>
                  <div class="method-icons">📱</div>
                </label>
              </div>

              <!-- Credit Card Fields -->
              <div id="card-fields" class="card-details-box">
                <div class="form-field">
                  <label>Card Number</label>
                  <input type="text" id="chk-card-num" placeholder="4242 •••• •••• 4242" value="4242 •••• •••• 8892" />
                </div>
                <div class="form-row-2">
                  <div class="form-field">
                    <label>Expiration</label>
                    <input type="text" placeholder="MM / YY" value="12/28" />
                  </div>
                  <div class="form-field">
                    <label>Security CVC</label>
                    <input type="text" placeholder="CVC" value="894" />
                  </div>
                </div>
              </div>

              <!-- Cash on Delivery Notice -->
              <div id="cod-notice" class="cod-details-box" style="display: none;">
                <div class="cod-pill">💵 Cash on Delivery Selected</div>
                <p>Our concierge will send an SMS/WhatsApp verification prior to dispatch. Please have the exact amount of <strong>${state.formatPrice(total)}</strong> ready for the courier.</p>
              </div>

              <!-- Apple / Google Pay Box -->
              <div id="apple-pay-box" class="apple-pay-details-box" style="display: none;">
                <button type="button" class="btn btn-block btn-apple-pay" id="btn-mock-apple-pay">
                   Pay with Apple Pay / G Pay
                </button>
                <p style="font-size:0.8rem; color:var(--text-muted); text-align:center; margin-top:0.5rem;">Biometric verification will authorize ${state.formatPrice(total)} instantly.</p>
              </div>

              <div class="form-actions form-actions-split">
                <button type="button" class="btn btn-outline" id="back-to-step-1">&larr; Back to Address</button>
                <button type="submit" class="btn btn-gold btn-block" id="btn-submit-order">Place Luxury Order (${state.formatPrice(total)})</button>
              </div>
            </form>
          ` : `
            <div class="order-success-screen">
              <div class="success-check-badge">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <h2>Thank You for Your Patronage!</h2>
              <p class="order-code">Atelier Order Reference: <strong>#${completedOrder.orderId}</strong></p>
              <p class="order-subtext">A formal invoice and DHL dispatch notification have been forwarded to <strong>${completedOrder.customer.email}</strong>. Master tailors are currently preparing your garments for shipment.</p>
              
              <div class="receipt-card">
                <div class="receipt-row"><span>Client:</span> <strong>${completedOrder.customer.name}</strong></div>
                <div class="receipt-row"><span>Destination:</span> <span>${completedOrder.customer.address}, ${completedOrder.customer.city}, ${completedOrder.customer.country}</span></div>
                <div class="receipt-row"><span>Payment Method:</span> <span>${completedOrder.paymentMethod === 'cod' ? 'Cash on Delivery (Pending)' : completedOrder.paymentMethod === 'apple_pay' ? 'Apple / Google Pay (Authorized)' : 'Credit Card (Stripe Paid)'}</span></div>
                <div class="receipt-row"><span>Total Paid:</span> <strong style="color:var(--accent-gold); font-size:1.1rem;">${completedOrder.currencyFormattedTotal}</strong></div>
                <div class="receipt-row"><span>Status:</span> <span class="badge-success">Confirmed & In Production</span></div>
                <div class="receipt-row"><span>Estimated Express Delivery:</span> <span>3-5 Business Days</span></div>
              </div>

              <div class="success-actions">
                <button class="btn btn-primary" id="btn-print-receipt">Print Atelier Receipt</button>
                <button class="btn btn-outline" id="btn-finish-shopping">Continue Exploring Collections</button>
              </div>
            </div>
          `}
        </div>

        <!-- Summary Column -->
        <div class="checkout-summary-column">
          <div class="order-summary-card">
            <h4>${isStep3 ? 'Purchased Atelier Creations' : 'Order Summary'} (${itemCount} items)</h4>
            <div class="summary-items-scroll">
              ${orderItems.map((item) => `
                <div class="summary-item-row">
                  <img src="${item.image}" alt="${item.name}" />
                  <div class="summary-item-meta">
                    <h6>${item.name}</h6>
                    <small>Size: <strong>${item.size}</strong> | Color: <strong>${item.color.name}</strong></small>
                    <small>Qty: <strong>${item.quantity}</strong></small>
                  </div>
                  <div class="summary-item-price">
                    ${isStep3 ? item.formattedLinePrice : state.formatPrice(item.priceUSD * item.quantity)}
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="summary-math-table">
              <div class="math-row">
                <span>Subtotal:</span>
                <span>${isStep3 ? completedOrder.currencyFormattedSubtotal : state.formatPrice(subtotal)}</span>
              </div>
              ${discount > 0 ? `
                <div class="math-row discount-math">
                  <span>Voucher Savings (${promoCode || 'LUXE'}):</span>
                  <span>-${isStep3 ? completedOrder.currencyFormattedDiscount : state.formatPrice(discount)}</span>
                </div>
              ` : ''}
              <div class="math-row">
                <span>Express Courier Shipping:</span>
                <span>${shipping === 0 ? '<strong class="text-green">COMPLIMENTARY</strong>' : (isStep3 ? completedOrder.currencyFormattedShipping : state.formatPrice(shipping))}</span>
              </div>
              <div class="math-row total-math">
                <span>Total Amount:</span>
                <span>${isStep3 ? completedOrder.currencyFormattedTotal : state.formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Step 1: Handle address submit
    if (step === 1) {
      const sForm = document.getElementById("shipping-form");
      if (sForm) {
        sForm.addEventListener("submit", (e) => {
          e.preventDefault();
          this.shippingInfo = {
            name: `${document.getElementById("chk-fname").value.trim()} ${document.getElementById("chk-lname").value.trim()}`,
            email: document.getElementById("chk-email").value.trim(),
            phone: document.getElementById("chk-phone").value.trim(),
            address: document.getElementById("chk-address").value.trim(),
            city: document.getElementById("chk-city").value.trim(),
            state: document.getElementById("chk-state").value.trim(),
            zip: document.getElementById("chk-zip").value.trim(),
            country: document.getElementById("chk-country").value
          };
          UI.renderCheckoutWizard(2);
        });
      }
    } 
    // Step 2: Handle Payment method selection and submit
    else if (step === 2) {
      const backBtn = document.getElementById("back-to-step-1");
      if (backBtn) {
        backBtn.addEventListener("click", () => UI.renderCheckoutWizard(1));
      }

      const cardFields = document.getElementById("card-fields");
      const codNotice = document.getElementById("cod-notice");
      const applePayBox = document.getElementById("apple-pay-box");
      const methodCards = document.querySelectorAll(".payment-method-card");

      // Dynamic payment option switching
      methodCards.forEach((card) => {
        card.addEventListener("click", () => {
          const radio = card.querySelector('input[type="radio"]');
          if (radio) radio.checked = true;

          methodCards.forEach(c => c.classList.remove("selected"));
          card.classList.add("selected");

          const method = card.getAttribute("data-method");
          if (method === "card") {
            if (cardFields) cardFields.style.display = "block";
            if (codNotice) codNotice.style.display = "none";
            if (applePayBox) applePayBox.style.display = "none";
          } else if (method === "cod") {
            if (cardFields) cardFields.style.display = "none";
            if (codNotice) codNotice.style.display = "block";
            if (applePayBox) applePayBox.style.display = "none";
          } else if (method === "apple_pay") {
            if (cardFields) cardFields.style.display = "none";
            if (codNotice) codNotice.style.display = "none";
            if (applePayBox) applePayBox.style.display = "block";
          }
        });
      });

      const pForm = document.getElementById("payment-form");
      if (pForm) {
        pForm.addEventListener("submit", (e) => {
          e.preventDefault();

          const selectedMethod = document.querySelector('input[name="payment_method"]:checked')?.value || "card";
          const subTotalUSD = state.getCartSubtotalUSD();
          const discUSD = state.getCartDiscountUSD();
          const totUSD = state.getCartTotalUSD();
          const shipUSD = subTotalUSD > 200 || subTotalUSD === 0 ? 0 : 25;

          // Snapshot order data before clearing cart
          const finalOrder = {
            orderId: "LX-" + Math.floor(100000 + Math.random() * 900000),
            items: state.cart.map(item => ({
              ...item,
              formattedLinePrice: state.formatPrice(item.priceUSD * item.quantity)
            })),
            subtotal: subTotalUSD,
            discount: discUSD,
            shipping: shipUSD,
            total: totUSD,
            currency: state.currency,
            currencyFormattedSubtotal: state.formatPrice(subTotalUSD),
            currencyFormattedDiscount: state.formatPrice(discUSD),
            currencyFormattedShipping: shipUSD === 0 ? "FREE" : state.formatPrice(shipUSD),
            currencyFormattedTotal: state.formatPrice(totUSD),
            promo: state.appliedPromo ? { ...state.appliedPromo } : null,
            paymentMethod: selectedMethod,
            customer: this.shippingInfo || {
              name: "Valued Atelier Client",
              email: "client@luxecouture.com",
              address: "5th Avenue Boulevard",
              city: "Lahore",
              country: "Pakistan"
            },
            date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
          };

          this.lastOrder = finalOrder;
          // Clear cart now that order is securely placed
          state.clearCart();
          UI.renderCheckoutWizard(3, finalOrder);
          UI.showToast("Order placed successfully! Welcome to Luxe Couture.", "success");
        });
      }

      const mockApplePay = document.getElementById("btn-mock-apple-pay");
      if (mockApplePay) {
        mockApplePay.addEventListener("click", () => {
          if (pForm) pForm.requestSubmit();
        });
      }
    } 
    // Step 3: Handle receipt printing & continue shopping
    else if (step === 3) {
      const printBtn = document.getElementById("btn-print-receipt");
      if (printBtn) {
        printBtn.addEventListener("click", () => window.print());
      }
      const finishBtn = document.getElementById("btn-finish-shopping");
      if (finishBtn) {
        finishBtn.addEventListener("click", () => {
          UI.closeCheckoutModal();
          state.setView("shop");
        });
      }
    }
  }
};
