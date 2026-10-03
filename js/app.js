// LUXE COUTURE - Main Application Controller

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

const App = {
  init() {
    // Apply saved theme
    document.documentElement.setAttribute("data-theme", state.theme);
    
    // Subscribe views to state changes
    state.subscribe(() => {
      this.renderCurrentView();
      this.updateNavbarBadges();
      this.updateCurrencySelectors();
    });

    // Initialize sub-modules
    CartEngine.init();

    // Attach global events
    this.attachNavEvents();
    this.attachCurrencyEvents();
    this.attachThemeEvents();
    this.attachSearchEvents();
    this.attachModalCloseEvents();

    // Initial render
    this.renderCurrentView();
    this.updateNavbarBadges();
    this.updateCurrencySelectors();
  },

  updateNavbarBadges() {
    const wishCount = state.wishlist.length;
    document.querySelectorAll(".wishlist-badge-count").forEach((el) => {
      el.textContent = wishCount;
      el.style.display = wishCount > 0 ? "inline-flex" : "none";
    });
  },

  updateCurrencySelectors() {
    document.querySelectorAll(".currency-select").forEach((select) => {
      select.value = state.currency;
    });
  },

  attachNavEvents() {
    // Navigation Links
    document.querySelectorAll("[data-nav-target]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetView = link.getAttribute("data-nav-target");
        
        // If it specifies an origin filter
        const originFilter = link.getAttribute("data-filter-origin");
        if (originFilter) {
          state.activeFilters.origin = originFilter;
        }

        state.setView(targetView);

        // Close mobile menu if open
        const mobileMenu = document.getElementById("mobile-nav-drawer");
        if (mobileMenu) mobileMenu.classList.remove("drawer-open");
      });
    });

    // Mobile nav toggle
    const mobileToggle = document.getElementById("mobile-menu-toggle");
    const mobileDrawer = document.getElementById("mobile-nav-drawer");
    const mobileClose = document.getElementById("mobile-drawer-close");
    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener("click", () => mobileDrawer.classList.add("drawer-open"));
    }
    if (mobileClose && mobileDrawer) {
      mobileClose.addEventListener("click", () => mobileDrawer.classList.remove("drawer-open"));
    }

    // Cart trigger buttons
    document.querySelectorAll(".cart-drawer-trigger").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        UI.openCartDrawer();
      });
    });
  },

  attachCurrencyEvents() {
    document.querySelectorAll(".currency-select").forEach((select) => {
      select.addEventListener("change", (e) => {
        state.setCurrency(e.target.value);
        UI.showToast(`Currency updated to ${e.target.value}`, "info", 2000);
      });
    });
  },

  attachThemeEvents() {
    document.querySelectorAll(".theme-toggle-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.toggleTheme();
        const isDark = state.theme === "dark";
        UI.showToast(`Switched to ${isDark ? 'Dark Luxe' : 'Light Atelier'} mode`, "info", 1800);
      });
    });
  },

  attachSearchEvents() {
    const searchInput = document.getElementById("global-search-input");
    const searchDropdown = document.getElementById("search-results-dropdown");

    if (searchInput && searchDropdown) {
      searchInput.addEventListener("input", (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length < 2) {
          searchDropdown.style.display = "none";
          return;
        }

        const matches = PRODUCTS_DATA.filter(
          (p) => p.name.toLowerCase().includes(query) || 
                 p.origin.toLowerCase().includes(query) || 
                 p.category.toLowerCase().includes(query) ||
                 p.fabric.toLowerCase().includes(query)
        ).slice(0, 5);

        if (matches.length === 0) {
          searchDropdown.innerHTML = `<div class="search-empty">No luxury pieces found for "${query}"</div>`;
        } else {
          searchDropdown.innerHTML = `
            <div class="search-results-header">Matching Creations (${matches.length})</div>
            ${matches.map((item) => `
              <div class="search-result-item" data-id="${item.id}">
                <img src="${item.images[0]}" alt="${item.name}" />
                <div class="meta">
                  <div class="title">${item.name}</div>
                  <div class="tags"><span class="badge-mini">${item.origin}</span> • ${state.formatPrice(item.priceUSD)}</div>
                </div>
              </div>
            `).join('')}
            <div class="search-view-all" id="btn-search-view-all">View all results in Shop &rarr;</div>
          `;

          searchDropdown.querySelectorAll(".search-result-item").forEach((row) => {
            row.addEventListener("click", () => {
              const id = row.getAttribute("data-id");
              searchDropdown.style.display = "none";
              searchInput.value = "";
              UI.openProductModal(id);
            });
          });

          const viewAll = searchDropdown.querySelector("#btn-search-view-all");
          if (viewAll) {
            viewAll.addEventListener("click", () => {
              state.setFilter("search", query);
              searchDropdown.style.display = "none";
              state.setView("shop");
            });
          }
        }

        searchDropdown.style.display = "block";
      });

      // Close search on click outside
      document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
          searchDropdown.style.display = "none";
        }
      });

      // Enter key to search
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          state.setFilter("search", searchInput.value.trim());
          searchDropdown.style.display = "none";
          state.setView("shop");
        }
      });
    }
  },

  attachModalCloseEvents() {
    // Product modal close
    const pModal = document.getElementById("product-modal");
    if (pModal) {
      pModal.querySelectorAll(".modal-close-btn, .modal-backdrop").forEach((el) => {
        el.addEventListener("click", () => UI.closeProductModal());
      });
    }

    // Size Guide modal close
    const gModal = document.getElementById("size-guide-modal");
    if (gModal) {
      gModal.querySelectorAll(".modal-close-btn, .modal-backdrop").forEach((el) => {
        el.addEventListener("click", () => UI.closeSizeGuideModal());
      });
    }

    // Checkout modal close
    const cModal = document.getElementById("checkout-modal");
    if (cModal) {
      cModal.querySelectorAll(".modal-close-btn, .modal-backdrop").forEach((el) => {
        el.addEventListener("click", () => UI.closeCheckoutModal());
      });
    }

    // Article modal close
    const aModal = document.getElementById("article-modal");
    if (aModal) {
      aModal.querySelectorAll(".modal-close-btn, .modal-backdrop").forEach((el) => {
        el.addEventListener("click", () => {
          aModal.classList.remove("modal-active");
          document.body.classList.remove("modal-open");
        });
      });
    }

    // ESC key close all
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        UI.closeProductModal();
        UI.closeSizeGuideModal();
        UI.closeCartDrawer();
        UI.closeCheckoutModal();
        if (aModal) {
          aModal.classList.remove("modal-active");
          document.body.classList.remove("modal-open");
        }
      }
    });
  },

  // --- VIEW ROUTING ---
  renderCurrentView() {
    // Hide all view containers
    document.querySelectorAll(".page-view").forEach((view) => {
      view.style.display = "none";
    });

    // Update active class in navbar
    document.querySelectorAll(".nav-link").forEach((link) => {
      const target = link.getAttribute("data-nav-target");
      if (target === state.currentView) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    const activeContainer = document.getElementById(`view-${state.currentView}`);
    if (activeContainer) {
      activeContainer.style.display = "block";
    }

    if (state.currentView === "home") {
      this.renderHomeView();
    } else if (state.currentView === "shop") {
      this.renderShopView();
    } else if (state.currentView === "lookbook") {
      this.renderLookbookView();
    } else if (state.currentView === "blog") {
      this.renderBlogView();
    } else if (state.currentView === "story") {
      this.renderStoryView();
    } else if (state.currentView === "wishlist") {
      this.renderWishlistView();
    }
  },

  // --- HOME VIEW ---
  renderHomeView() {
    const featuredContainer = document.getElementById("home-featured-grid");
    if (featuredContainer) {
      const featuredItems = PRODUCTS_DATA.filter((p) => p.isFeatured).slice(0, 4);
      featuredContainer.innerHTML = featuredItems.map((p) => this.generateProductCardHTML(p)).join('');
      this.attachProductCardEvents(featuredContainer);
    }

    const trendingContainer = document.getElementById("home-trending-grid");
    if (trendingContainer) {
      const trendingItems = PRODUCTS_DATA.filter((p) => p.isTrending).slice(0, 4);
      trendingContainer.innerHTML = trendingItems.map((p) => this.generateProductCardHTML(p)).join('');
      this.attachProductCardEvents(trendingContainer);
    }

    // Lookbook preview
    const lookbookPreview = document.getElementById("home-lookbook-spread");
    if (lookbookPreview) {
      lookbookPreview.innerHTML = LOOKBOOKS_DATA.slice(0, 2).map((look) => `
        <div class="editorial-card-hero">
          <div class="editorial-image-frame">
            <img src="${look.image}" alt="${look.title}" />
            <span class="editorial-tag">${look.tag}</span>
          </div>
          <div class="editorial-text-meta">
            <h4>${look.title}</h4>
            <p class="editorial-sub">${look.subtitle}</p>
            <p class="editorial-quote">"${look.quote}"</p>
            <button class="btn btn-editorial" data-nav-target="lookbook">Explore Lookbook &rarr;</button>
          </div>
        </div>
      `).join('');

      lookbookPreview.querySelectorAll("[data-nav-target]").forEach((btn) => {
        btn.addEventListener("click", () => state.setView("lookbook"));
      });
    }

    // Fashion Journal preview
    const blogHomeContainer = document.getElementById("home-blog-preview-grid");
    if (blogHomeContainer) {
      blogHomeContainer.innerHTML = BLOG_POSTS_DATA.slice(0, 3).map((post) => `
        <article class="blog-card" data-blog-id="${post.id}">
          <div class="blog-card-image">
            <img src="${post.image}" alt="${post.title}" loading="lazy" />
            <span class="blog-category-tag">${post.category}</span>
          </div>
          <div class="blog-card-body">
            <div class="blog-meta-row">
              <span>${post.date}</span>
              <span>•</span>
              <span>${post.readTime}</span>
            </div>
            <h3 class="blog-card-title">${post.title}</h3>
            <p class="blog-card-excerpt">${post.excerpt}</p>
            <div class="blog-author-line">By ${post.author}</div>
            <button class="btn btn-editorial btn-read-article" data-article-id="${post.id}">Read Full Story &rarr;</button>
          </div>
        </article>
      `).join('');

      blogHomeContainer.querySelectorAll(".btn-read-article, .blog-card-title").forEach((btn) => {
        btn.addEventListener("click", () => {
          const card = btn.closest(".blog-card");
          const id = card.getAttribute("data-blog-id");
          this.openArticleModal(id);
        });
      });
    }

    // Testimonials
    const testContainer = document.getElementById("home-testimonials-grid");
    if (testContainer) {
      testContainer.innerHTML = TESTIMONIALS_DATA.map((t) => `
        <div class="testimonial-luxury-card">
          <div class="test-stars">★★★★★</div>
          <p class="test-quote">"${t.text}"</p>
          <div class="test-author-row">
            <img src="${t.avatar}" alt="${t.author}" class="test-avatar" />
            <div>
              <h6 class="test-name">${t.author}</h6>
              <span class="test-role">${t.role} • ${t.city}</span>
            </div>
          </div>
        </div>
      `).join('');
    }
  },

  // --- SHOP CATALOG VIEW ---
  renderShopView() {
    const catalogGrid = document.getElementById("shop-catalog-grid");
    const countLabel = document.getElementById("shop-results-count");
    if (!catalogGrid) return;

    // Filter Logic
    let filtered = PRODUCTS_DATA.filter((item) => {
      // Origin Filter
      if (state.activeFilters.origin !== "all" && item.origin.toLowerCase() !== state.activeFilters.origin.toLowerCase()) {
        return false;
      }
      // Category Filter
      if (state.activeFilters.category !== "all" && !item.category.toLowerCase().includes(state.activeFilters.category.toLowerCase())) {
        return false;
      }
      // Gender Filter
      if (state.activeFilters.gender !== "all" && item.gender !== state.activeFilters.gender && item.gender !== "Unisex") {
        return false;
      }
      // Price Filter
      if (item.priceUSD > state.activeFilters.maxPrice) {
        return false;
      }
      // Search Query
      if (state.activeFilters.search) {
        const q = state.activeFilters.search.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesOrigin = item.origin.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        if (!matchesName && !matchesOrigin && !matchesCategory) return false;
      }
      return true;
    });

    // Sorting
    if (state.activeFilters.sortBy === "price-low") {
      filtered.sort((a, b) => a.priceUSD - b.priceUSD);
    } else if (state.activeFilters.sortBy === "price-high") {
      filtered.sort((a, b) => b.priceUSD - a.priceUSD);
    } else if (state.activeFilters.sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (state.activeFilters.sortBy === "newest") {
      filtered.sort((a, b) => (b.badge === "New Arrival" ? 1 : 0) - (a.badge === "New Arrival" ? 1 : 0));
    }

    if (countLabel) {
      countLabel.textContent = `Showing ${filtered.length} of ${PRODUCTS_DATA.length} Creations`;
    }

    // Origin pill tab sync
    document.querySelectorAll(".origin-filter-pill").forEach((pill) => {
      if (pill.getAttribute("data-origin") === state.activeFilters.origin) {
        pill.classList.add("active");
      } else {
        pill.classList.remove("active");
      }
    });

    if (filtered.length === 0) {
      catalogGrid.innerHTML = `
        <div class="empty-catalog-message">
          <h3>No creations matched your criteria</h3>
          <p>Try resetting filters or adjusting your price bracket to explore all collections.</p>
          <button class="btn btn-outline" id="btn-reset-filters">Reset All Filters</button>
        </div>
      `;
      const resetBtn = catalogGrid.querySelector("#btn-reset-filters");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          state.resetFilters();
        });
      }
      return;
    }

    catalogGrid.innerHTML = filtered.map((p) => this.generateProductCardHTML(p)).join('');
    this.attachProductCardEvents(catalogGrid);
    this.attachShopFilterBarEvents();
  },

  attachShopFilterBarEvents() {
    // Origin pills
    document.querySelectorAll(".origin-filter-pill").forEach((pill) => {
      pill.onclick = () => {
        state.setFilter("origin", pill.getAttribute("data-origin"));
      };
    });

    // Category select
    const catSelect = document.getElementById("filter-category-select");
    if (catSelect) {
      catSelect.value = state.activeFilters.category;
      catSelect.onchange = (e) => state.setFilter("category", e.target.value);
    }

    // Gender select
    const genderSelect = document.getElementById("filter-gender-select");
    if (genderSelect) {
      genderSelect.value = state.activeFilters.gender;
      genderSelect.onchange = (e) => state.setFilter("gender", e.target.value);
    }

    // Sort select
    const sortSelect = document.getElementById("shop-sort-select");
    if (sortSelect) {
      sortSelect.value = state.activeFilters.sortBy;
      sortSelect.onchange = (e) => state.setFilter("sortBy", e.target.value);
    }

    // Price range slider
    const priceSlider = document.getElementById("filter-price-slider");
    const priceLabel = document.getElementById("filter-price-val");
    if (priceSlider && priceLabel) {
      priceSlider.value = state.activeFilters.maxPrice;
      priceLabel.textContent = state.formatPrice(state.activeFilters.maxPrice);
      priceSlider.oninput = (e) => {
        const val = parseInt(e.target.value);
        priceLabel.textContent = state.formatPrice(val);
        state.setFilter("maxPrice", val);
      };
    }
  },

  // --- LOOKBOOK VIEW ---
  renderLookbookView() {
    const container = document.getElementById("lookbook-main-container");
    if (!container) return;

    container.innerHTML = LOOKBOOKS_DATA.map((look) => {
      const products = PRODUCTS_DATA.filter((p) => look.featuredProductIds.includes(p.id));

      return `
        <article class="lookbook-story-block">
          <div class="lookbook-hero-banner">
            <img src="${look.image}" alt="${look.title}" />
            <div class="lookbook-overlay-text">
              <span class="editorial-vol">${look.tag}</span>
              <h2>${look.title}</h2>
              <p class="lookbook-desc">${look.subtitle}</p>
            </div>
          </div>

          <div class="lookbook-content-section">
            <blockquote class="lookbook-pull-quote">"${look.quote}"</blockquote>
            
            <div class="lookbook-wardrobe-heading">
              <h5>Curated Ensemble in this Spread:</h5>
            </div>

            <div class="product-grid lookbook-product-grid">
              ${products.map((p) => this.generateProductCardHTML(p)).join('')}
            </div>
          </div>
        </article>
      `;
    }).join('');

    this.attachProductCardEvents(container);
  },

  // --- EDITORIAL JOURNAL / BLOG VIEW ---
  renderBlogView() {
    const container = document.getElementById("blog-articles-grid");
    if (!container) return;

    container.innerHTML = BLOG_POSTS_DATA.map((post) => `
      <article class="blog-card" data-blog-id="${post.id}">
        <div class="blog-card-image">
          <img src="${post.image}" alt="${post.title}" loading="lazy" />
          <span class="blog-category-tag">${post.category}</span>
        </div>
        <div class="blog-card-body">
          <div class="blog-meta-row">
            <span>${post.date}</span>
            <span>•</span>
            <span>${post.readTime}</span>
          </div>
          <h3 class="blog-card-title">${post.title}</h3>
          <p class="blog-card-excerpt">${post.excerpt}</p>
          <div class="blog-author-line">By ${post.author}</div>
          <button class="btn btn-editorial btn-read-article" data-article-id="${post.id}">Read Full Story &rarr;</button>
        </div>
      </article>
    `).join('');

    container.querySelectorAll(".btn-read-article, .blog-card-title").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const card = btn.closest(".blog-card");
        const id = card.getAttribute("data-blog-id");
        this.openArticleModal(id);
      });
    });
  },

  openArticleModal(articleId) {
    const post = BLOG_POSTS_DATA.find((b) => b.id === articleId);
    if (!post) return;

    const modal = document.getElementById("article-modal");
    const modalContent = document.getElementById("article-modal-content");
    if (!modal || !modalContent) return;

    const relatedProduct = PRODUCTS_DATA.find((p) => p.id === post.relatedProductId);

    modalContent.innerHTML = `
      <div class="article-hero-banner">
        <img src="${post.image}" alt="${post.title}" />
        <div class="article-hero-overlay">
          <span class="blog-category-tag">${post.category}</span>
          <h2>${post.title}</h2>
          <div class="article-meta-line">${post.author} • ${post.date} (${post.readTime})</div>
        </div>
      </div>
      <div class="article-prose">
        ${post.content}

        ${relatedProduct ? `
          <div class="article-featured-product-box">
            <h5>Featured Creation in this Story:</h5>
            <div class="featured-product-compact">
              <img src="${relatedProduct.images[0]}" alt="${relatedProduct.name}" />
              <div class="fp-meta">
                <h6>${relatedProduct.name}</h6>
                <div class="fp-price">${state.formatPrice(relatedProduct.priceUSD)}</div>
                <button class="btn btn-outline btn-sm" id="btn-article-shop-item" data-product-id="${relatedProduct.id}">View Atelier Piece &rarr;</button>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;

    const shopItemBtn = modalContent.querySelector("#btn-article-shop-item");
    if (shopItemBtn) {
      shopItemBtn.addEventListener("click", () => {
        modal.classList.remove("modal-active");
        UI.openProductModal(relatedProduct.id);
      });
    }

    modal.classList.add("modal-active");
    document.body.classList.add("modal-open");
  },

  // --- STORY / ABOUT VIEW ---
  renderStoryView() {
    const container = document.getElementById("story-pillars-grid");
    if (container) {
      container.innerHTML = BRAND_STORIES.map((s) => `
        <div class="story-pillar-card">
          ${s.image ? `
            <div class="story-card-image" style="width: 100%; height: 220px; border-radius: var(--radius-sm); overflow: hidden; margin-bottom: 1.25rem;">
              <img src="${s.image}" alt="${s.title}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" />
            </div>
          ` : ''}
          <div class="story-pillar-tag">${s.year}</div>
          <h3>${s.title}</h3>
          <p>${s.text}</p>
        </div>
      `).join('');
    }
  },

  // --- WISHLIST VIEW ---
  renderWishlistView() {
    const container = document.getElementById("wishlist-grid-container");
    const emptyMsg = document.getElementById("wishlist-empty-msg");
    if (!container) return;

    const wishlistProducts = PRODUCTS_DATA.filter((p) => state.wishlist.includes(p.id));

    if (wishlistProducts.length === 0) {
      if (emptyMsg) emptyMsg.style.display = "block";
      container.innerHTML = "";
      return;
    }

    if (emptyMsg) emptyMsg.style.display = "none";
    container.innerHTML = wishlistProducts.map((p) => this.generateProductCardHTML(p)).join('');
    this.attachProductCardEvents(container);
  },

  // --- PRODUCT CARD GENERATOR ---
  generateProductCardHTML(p) {
    const isWished = state.isInWishlist(p.id);
    const discountPercent = p.originalPriceUSD
      ? Math.round(((p.originalPriceUSD - p.priceUSD) / p.originalPriceUSD) * 100)
      : 0;

    return `
      <div class="product-card" data-product-id="${p.id}">
        <div class="card-image-wrap">
          <img src="${p.images[0]}" alt="${p.name}" class="card-img primary-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80'" />
          
          <div class="card-top-badges">
            <span class="origin-tag-badge">${p.origin}</span>
            ${p.badge ? `<span class="sale-tag-badge">${p.badge}</span>` : ''}
          </div>

          <button class="card-wishlist-trigger ${isWished ? 'active' : ''}" data-wish-id="${p.id}" title="Add to Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWished ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>

          <div class="card-quick-actions">
            <button class="btn btn-quick-view" data-quick-view-id="${p.id}">Quick View</button>
            <button class="btn btn-quick-bag" data-quick-bag-id="${p.id}">+ Bag</button>
          </div>
        </div>

        <div class="card-details">
          <div class="card-category-line">${p.category} • ${p.gender}</div>
          <h4 class="card-title" data-quick-view-id="${p.id}">${p.name}</h4>
          
          <div class="card-price-line">
            <span class="current-price">${state.formatPrice(p.priceUSD)}</span>
            ${p.originalPriceUSD ? `<span class="original-price">${state.formatPrice(p.originalPriceUSD)}</span>` : ''}
            ${discountPercent > 0 ? `<span class="card-discount-pill">${discountPercent}% OFF</span>` : ''}
          </div>

          <div class="card-swatches-preview">
            ${p.colors.slice(0, 3).map((c) => `
              <span class="mini-swatch" style="background-color: ${c.hex};" title="${c.name}"></span>
            `).join('')}
            ${p.colors.length > 3 ? `<span class="more-colors">+${p.colors.length - 3}</span>` : ''}
          </div>
        </div>
      </div>
    `;
  },

  attachProductCardEvents(container) {
    // Quick view triggers
    container.querySelectorAll("[data-quick-view-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-quick-view-id");
        UI.openProductModal(id);
      });
    });

    // Quick add to bag
    container.querySelectorAll("[data-quick-bag-id]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-quick-bag-id");
        const product = PRODUCTS_DATA.find((p) => p.id === id);
        if (product) {
          state.addToCart(product, product.sizes[0], product.colors[0], 1);
          UI.showToast(`Added "${product.name}" to your shopping bag`, "success");
          UI.openCartDrawer();
        }
      });
    });

    // Wishlist buttons
    container.querySelectorAll("[data-wish-id]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-wish-id");
        const isNowIn = state.toggleWishlist(id);
        const product = PRODUCTS_DATA.find((p) => p.id === id);
        UI.showToast(isNowIn ? `Saved "${product.name}" to Wishlist` : `Removed from Wishlist`, "info");
      });
    });
  }
};
