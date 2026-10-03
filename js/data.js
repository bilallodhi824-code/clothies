// LUXE COUTURE - Product Database, Blog Articles & Lookbooks
// 100% Unique, Non-Repeating, High-Resolution Curated Fashion Images

const PRODUCTS_DATA = [
  // ==================== PAKISTANI & SOUTH ASIAN HAUTE COUTURE ====================
  {
    id: "pk-01",
    name: "Noor-e-Jahan Embroidered Raw Silk Ensemble",
    origin: "Pakistani",
    category: "Festive & Luxury Pret",
    gender: "Women",
    priceUSD: 185,
    originalPriceUSD: 230,
    rating: 4.9,
    reviewsCount: 84,
    badge: "Bestseller",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Emerald Royale", hex: "#064e3b" },
      { name: "Burgundy Velvet", hex: "#4c0519" },
      { name: "Antique Gold", hex: "#d97706" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "Custom"],
    fabric: "100% Pure Raw Silk with Organza Dupatta and Zari Tilla Handwork",
    description: "An ode to timeless South Asian regal craftsmanship. Handcrafted with intricate gold zari, gota patti embroidery on pure raw silk, paired with a hand-painted organza dupatta with scalloped borders.",
    details: [
      "Intricate hand-embellished neckline & sleeves with gold tilla",
      "Includes 3-piece set: Embroidered Shirt, Raw Silk Trousers & Organza Dupatta",
      "Specialist dry clean only",
      "Artisan-crafted in Lahore, Pakistan"
    ],
    isFeatured: true,
    isTrending: true,
    stock: 8
  },
  {
    id: "pk-02",
    name: "Gulbahar Handcrafted Chikankari Lawn Kurta",
    origin: "Pakistani",
    category: "Festive & Luxury Pret",
    gender: "Women",
    priceUSD: 75,
    originalPriceUSD: 95,
    rating: 4.8,
    reviewsCount: 120,
    badge: "Summer Drop",
    images: [
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Powder Blue", hex: "#93c5fd" },
      { name: "Ivory Cloud", hex: "#f8fafc" },
      { name: "Blush Rose", hex: "#fbcfe8" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    fabric: "100% Breathable Egyptian Lawn with Chikankari Threadwork & Pearl Tassels",
    description: "Delicate pastel aesthetics tailored for effortless summer elegance. Featuring intricate hand-embroidered shadow work with pearl accents and scalloped organza cuffs.",
    details: [
      "Relaxed contemporary tunic silhouette",
      "Hand-finished lace inserts along side slits",
      "Gentle cold hand wash or dry clean",
      "Pairs with cigarette pants or culottes"
    ],
    isFeatured: true,
    isTrending: false,
    stock: 15
  },
  {
    id: "pk-03",
    name: "Shahzada Royal Embroidered Velvet Sherwani",
    origin: "Pakistani",
    category: "Tailoring & Blazers",
    gender: "Men",
    priceUSD: 310,
    originalPriceUSD: 380,
    rating: 5.0,
    reviewsCount: 42,
    badge: "Haute Couture",
    images: [
      "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Midnight Onyx", hex: "#0f172a" },
      { name: "Deep Maroon", hex: "#881337" }
    ],
    sizes: ["38 (S)", "40 (M)", "42 (L)", "44 (XL)", "Custom"],
    fabric: "Micro-velvet with metallic dabka, naqshi and Swarovski crystal accents",
    description: "Crafted for grand entrances. A tailored royal silhouette featuring bespoke metallic embroidery on deep plush velvet, complete with customized hand-carved brass buttons.",
    details: [
      "Includes Inner Silk Kurta & Churidar Pajama",
      "Padded structured shoulders with tailored darting",
      "Specialist dry clean only",
      "Complimentary matching Pocket Square"
    ],
    isFeatured: true,
    isTrending: true,
    stock: 5
  },
  {
    id: "pk-04",
    name: "Aafreen Heritage Crimson Bridal Zardozi Lehenga",
    origin: "Pakistani",
    category: "Festive & Luxury Pret",
    gender: "Women",
    priceUSD: 590,
    originalPriceUSD: 720,
    rating: 4.9,
    reviewsCount: 31,
    badge: "Bridal Masterpiece",
    images: [
      "https://images.unsplash.com/photo-1594463750939-ebb28c3cc59a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Crimson Heritage", hex: "#991b1b" },
      { name: "Rose Gold Mirage", hex: "#e2b8a6" }
    ],
    sizes: ["XS", "S", "M", "L", "Custom"],
    fabric: "French Net & Pure Banarasi Brocade with heavy zardozi handcraft",
    description: "A heirloom bridal masterpiece. Thousands of micro-beads, cut-dana, and floral zardozi motifs hand-stitched over 320 artisan hours in Lahore.",
    details: [
      "3-Piece Set: Can-Can flare Lehenga, Blouse, 3.5m Veil Dupatta",
      "Double dupatta styling option",
      "Bespoke fitting consultation included",
      "Comes in luxury velvet bridal trunk"
    ],
    isFeatured: true,
    isTrending: true,
    stock: 3
  },
  {
    id: "pk-05",
    name: "Dastaan Hand-Woven Slub Linen Kurta Set",
    origin: "Pakistani",
    category: "Casual Pret & Shirts",
    gender: "Men",
    priceUSD: 65,
    originalPriceUSD: 80,
    rating: 4.7,
    reviewsCount: 95,
    badge: "New Arrival",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Warm Taupe", hex: "#78716c" },
      { name: "Chalk White", hex: "#ffffff" },
      { name: "Slate Navy", hex: "#334155" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    fabric: "High-grade slub linen cotton blend",
    description: "Clean minimalist lines meet breathable comfort. Featuring subtle thread pin-tucks on collar and placket with classic straight pajama trousers.",
    details: [
      "Mandarin collar with engraved wooden buttons",
      "Two side seam pockets",
      "Machine washable with cold water",
      "Wrinkle-resistant luxury finish"
    ],
    isFeatured: false,
    isTrending: false,
    stock: 22
  },

  // ==================== WESTERN HAUTE & SARTORIAL ====================
  {
    id: "wt-01",
    name: "Milano Tailored Double-Breasted Wool Blazer",
    origin: "Western",
    category: "Tailoring & Blazers",
    gender: "Women",
    priceUSD: 195,
    originalPriceUSD: 245,
    rating: 4.9,
    reviewsCount: 142,
    badge: "Editor's Pick",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Charcoal Heather", hex: "#374151" },
      { name: "Sandstone Camel", hex: "#d97706" },
      { name: "Midnight Black", hex: "#111827" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    fabric: "Italian Virgin Wool Blend with Silk-touch Cupro Lining",
    description: "Sharp sartorial architecture inspired by Milanese runways. Features exaggerated peak lapels, horn buttons, and sculpted shoulders for an empowered silhouette.",
    details: [
      "Flap front pockets & internal ticket pocket",
      "Double rear vent for fluid movement",
      "Dry clean only",
      "Designed in Paris, Crafted in Italy"
    ],
    isFeatured: true,
    isTrending: true,
    stock: 11
  },
  {
    id: "wt-02",
    name: "Cote d'Azur Backless Silk Satin Slip Gown",
    origin: "Western",
    category: "Evening & Dresses",
    gender: "Women",
    priceUSD: 160,
    originalPriceUSD: 210,
    rating: 4.8,
    reviewsCount: 78,
    badge: "Trending",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Champagne Pearl", hex: "#fef08a" },
      { name: "Rouge Noir", hex: "#7f1d1d" },
      { name: "Obsidian", hex: "#0f172a" }
    ],
    sizes: ["XS", "S", "M", "L"],
    fabric: "100% Mulberry Silk Charmeuse with Bias Cut Draping",
    description: "Sensual 90s minimalism revived. The bias-cut silk drapes effortlessly over natural curves with an alluring cowl neckline and delicate criss-cross back straps.",
    details: [
      "Floor-length with subtle side slit",
      "Adjustable spaghetti straps",
      "Hand wash cold or dry clean",
      "Concealed side zip closure"
    ],
    isFeatured: true,
    isTrending: true,
    stock: 9
  },
  {
    id: "wt-03",
    name: "Savile Row Structured Slim-Fit Tuxedo",
    origin: "Western",
    category: "Tailoring & Blazers",
    gender: "Men",
    priceUSD: 340,
    originalPriceUSD: 420,
    rating: 5.0,
    reviewsCount: 56,
    badge: "Signature",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Jet Black", hex: "#000000" },
      { name: "Midnight Indigo", hex: "#1e1b4b" }
    ],
    sizes: ["36R", "38R", "40R", "42R", "44R"],
    fabric: "Super 140s Wool with Satin Shawl Lapel & Trims",
    description: "The pinnacle of black-tie sophistication. Meticulously tailored with satin-faced shawl collar, jetted pockets, and silk-stripe trousers.",
    details: [
      "Single button satin closure",
      "Trousers feature side adjusters (belt-free silhouette)",
      "Breathable Bemberg lining",
      "Complimentary garment bag"
    ],
    isFeatured: true,
    isTrending: false,
    stock: 7
  },
  {
    id: "wt-04",
    name: "Parisian Gabardine Belted Trench Coat",
    origin: "Western",
    category: "Denim & Outerwear",
    gender: "Women",
    priceUSD: 220,
    originalPriceUSD: 280,
    rating: 4.9,
    reviewsCount: 165,
    badge: "Iconic",
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Classic Honey", hex: "#ca8a04" },
      { name: "Stone Olive", hex: "#3f6212" },
      { name: "Pitch Black", hex: "#18181b" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    fabric: "Water-repellent Cotton Gabardine with Signature Check Undercollar",
    description: "An enduring wardrobe staple. Double-breasted with epaulettes, storm flap, and a D-ring waist belt that sculpts a polished hourglass line.",
    details: [
      "Weatherproof water-resistant treatment",
      "Detachable storm shield",
      "Tortoiseshell buckle and buttons",
      "Deep interior storm pockets"
    ],
    isFeatured: false,
    isTrending: true,
    stock: 14
  },
  {
    id: "wt-05",
    name: "Capri Linen Relaxed Camp Collar Resort Shirt",
    origin: "Western",
    category: "Casual Pret & Shirts",
    gender: "Men",
    priceUSD: 85,
    originalPriceUSD: 110,
    rating: 4.7,
    reviewsCount: 88,
    badge: "Summer Drop",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Crisp White", hex: "#f8fafc" },
      { name: "Terracotta Terrane", hex: "#c2410c" },
      { name: "Sage Grass", hex: "#4d7c0f" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    fabric: "100% French Normandy Flax Linen (Pre-washed)",
    description: "Breezy Mediterranean attitude in every stitch. Camp collar design crafted from garment-dyed European linen for effortless holiday styling.",
    details: [
      "Open Cuban camp collar",
      "Mother-of-pearl buttons",
      "Naturally cooling & moisture wicking",
      "Straight hem with side vents"
    ],
    isFeatured: false,
    isTrending: false,
    stock: 19
  },

  // ==================== AMERICAN CONTEMPORARY & STREETWEAR ====================
  {
    id: "us-01",
    name: "Brooklyn 14oz Raw Selvedge Denim Trucker Jacket",
    origin: "American",
    category: "Denim & Outerwear",
    gender: "Unisex",
    priceUSD: 145,
    originalPriceUSD: 180,
    rating: 4.9,
    reviewsCount: 110,
    badge: "Heritage",
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Raw Indigo", hex: "#1e3a8a" },
      { name: "Washed Vintage Ash", hex: "#475569" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    fabric: "14oz Japanese White Oak Shuttle-Loom Selvedge Cotton",
    description: "Built to endure and patina beautifully over decades. Heavyweight selvedge denim woven with authentic copper shanks and selvedge ID on inner placket.",
    details: [
      "Custom antique copper donut buttons",
      "Dual chest flap pockets + welt hand warmers",
      "Unwashed raw finish molds to your body",
      "Made in USA / Hand-inspected"
    ],
    isFeatured: true,
    isTrending: true,
    stock: 12
  },
  {
    id: "us-02",
    name: "Manhattan 500 GSM Heavyweight Fleece Hoodie",
    origin: "American",
    category: "Denim & Outerwear",
    gender: "Unisex",
    priceUSD: 95,
    originalPriceUSD: 120,
    rating: 4.8,
    reviewsCount: 215,
    badge: "Bestseller",
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Oatmeal Melange", hex: "#e2e8f0" },
      { name: "Washed Vintage Black", hex: "#1e293b" },
      { name: "Forest Moss", hex: "#14532d" }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    fabric: "500 GSM Heavyweight Organic French Terry Cotton",
    description: "The definitive urban hoodie. Boxy drape, dropped shoulders, double-layered crossover hood without drawstrings for ultra-clean street aesthetic.",
    details: [
      "500 GSM thick fleece for structured shape",
      "Ribbed side gussets for enhanced stretch",
      "Pre-shrunk organic yarn",
      "Minimal tonal branding on wrist"
    ],
    isFeatured: true,
    isTrending: true,
    stock: 25
  },
  {
    id: "us-03",
    name: "SoHo Minimalist Ribbed Knit Maxi Dress",
    origin: "American",
    category: "Evening & Dresses",
    gender: "Women",
    priceUSD: 110,
    originalPriceUSD: 140,
    rating: 4.7,
    reviewsCount: 92,
    badge: "New Season",
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Espresso Brown", hex: "#3b1e08" },
      { name: "Bone White", hex: "#f1f5f9" },
      { name: "Olive Shadow", hex: "#365314" }
    ],
    sizes: ["XS", "S", "M", "L"],
    fabric: "Viscose-Nylon blend heavy rib knit with elastane memory",
    description: "Sleek NYC casual luxury. Flattering figure-skimming ribbed knit that transitions effortlessly from day sneakers to evening stilettos.",
    details: [
      "High neckline with sculpted armholes",
      "Ankle-grazing length with side slit",
      "Machine wash gentle cycle",
      "Wrinkle-proof travel favorite"
    ],
    isFeatured: false,
    isTrending: true,
    stock: 16
  },
  {
    id: "us-04",
    name: "East Coast Heavy Brushed Flannel Overshirt",
    origin: "American",
    category: "Casual Pret & Shirts",
    gender: "Men",
    priceUSD: 80,
    originalPriceUSD: 105,
    rating: 4.8,
    reviewsCount: 64,
    badge: "Autumn Core",
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Buffalo Red & Black", hex: "#991b1b" },
      { name: "Pacific Navy Plaid", hex: "#1e3a8a" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    fabric: "10oz Brushed Yarn-Dyed Cotton Flannel",
    description: "Rugged New England craftsmanship. Brushed on both sides for supreme warmth, styled to be worn buttoned or open as a light jacket.",
    details: [
      "Reinforced elbows and yoke",
      "Double chest patch pockets with pencil slot",
      "Corozo nut durable buttons",
      "Relaxed layering fit"
    ],
    isFeatured: false,
    isTrending: false,
    stock: 18
  },

  // ==================== PAN-ASIAN CONTEMPORARY FUSION ====================
  {
    id: "as-01",
    name: "Kyoto Wave Jacquard Kimono Wrap Coat",
    origin: "Asian",
    category: "Denim & Outerwear",
    gender: "Unisex",
    priceUSD: 170,
    originalPriceUSD: 220,
    rating: 4.9,
    reviewsCount: 73,
    badge: "Artisanal",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Ink Black & Indigo", hex: "#0f172a" },
      { name: "Cedar Wood Tan", hex: "#78350f" }
    ],
    sizes: ["S/M (One Size)", "L/XL (One Size)"],
    fabric: "Woven Jacquard Cotton with Traditional Wave Motifs (Seigaiha)",
    description: "A harmonious union of East Asian ancestral silhouette and modern western tailoring. Wide draping sleeves and a removable sash belt.",
    details: [
      "Unstructured relaxed fit",
      "Deep hidden hip pockets",
      "Reversible styling potential",
      "Artisan-dyed organic yarns"
    ],
    isFeatured: true,
    isTrending: true,
    stock: 10
  },
  {
    id: "as-02",
    name: "Shanghai Frog-Button Silk Organza Kurti",
    origin: "Asian",
    category: "Festive & Luxury Pret",
    gender: "Women",
    priceUSD: 130,
    originalPriceUSD: 165,
    rating: 4.8,
    reviewsCount: 52,
    badge: "Limited Edition",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=900&q=80"
    ],
    colors: [
      { name: "Jade Green", hex: "#047857" },
      { name: "Lotus Pink", hex: "#f472b6" }
    ],
    sizes: ["XS", "S", "M", "L"],
    fabric: "Translucent Silk Organza with Satin Slip included",
    description: "Delicate Cheongsam mandarin frog buttons meet South Asian fluid tunic silhouette. Finished with golden zari corded embroidery along cuffs and hem.",
    details: [
      "Mandarin collar with handmade loop knot closures",
      "Includes separate 100% modal breathable slip",
      "Side high splits for movement",
      "Dry clean only"
    ],
    isFeatured: true,
    isTrending: false,
    stock: 8
  }
];

// ==================== EDITORIAL FASHION JOURNAL & BLOG POSTS ====================
const BLOG_POSTS_DATA = [
  {
    id: "blog-01",
    title: "The Art of Zardozi & Tilla Handwork: A 300-Year Heritage",
    category: "Couture Craftsmanship",
    date: "August 2026",
    readTime: "5 min read",
    author: "Zainab Malik (Senior Textile Curator, Lahore Atelier)",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
    excerpt: "Discover how multigenerational artisans hand-spin metallic gold threads and cut-dana beads to create heirloom raw silk ensembles.",
    content: `
      <p>In the quiet inner courtyards of Old Lahore and the royal havelis of the subcontinent, the art of <strong>Zardozi</strong>—literally translating from Persian as <em>sewing with gold</em>—has echoed across centuries. Passed down through master ustads (guild masters), this labor of love cannot be replicated by automated machinery.</p>
      
      <h3>The Geometry of Pure Raw Silk</h3>
      <p>Each <em>Noor-e-Jahan</em> ensemble begins on wooden charpoy frames called <em>Addas</em>. Artisans sketch intricate Mughal paisley and botanical motifs onto sheer tracing paper before puncturing the pattern onto the silk with charcoal powder. Over 80 to 120 consecutive hours, fine needles weave metallic <em>Tilla</em> and <em>Dabka</em> into tactile relief.</p>
      
      <blockquote>"Zardozi is not merely decorative; it is the physical memory of royal Mughal court attire preserved in every stitch."</blockquote>

      <h3>Caring for Your Heirloom Silks</h3>
      <p>Pure raw silk and handcrafted organza should always be preserved in breathable cotton muslins rather than plastic covers, shielded from direct sunlight to maintain the natural luster of gold threads.</p>
    `,
    relatedProductId: "pk-01"
  },
  {
    id: "blog-02",
    title: "The Modern Tailoring Code: Anatomy of the Double-Breasted Wool Blazer",
    category: "Sartorial Architecture",
    date: "July 2026",
    readTime: "4 min read",
    author: "Antoine Laurent (Master Tailor, Paris Studio)",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
    excerpt: "How sharp peak lapels, virgin Italian wool, and sculpted half-canvas chest darting create the definitive power silhouette.",
    content: `
      <p>A truly great double-breasted blazer is the pinnacle of modern sartorial architecture. Built with <strong>half-canvas horsehair interlining</strong>, the blazer moulds to the wearer’s torso over time, creating a bespoke drape that synthetic glued jackets can never achieve.</p>
      
      <h3>Why Peak Lapels Command the Room</h3>
      <p>Our Milan-crafted blazer features elongated 11cm peak lapels that draw the eye outward, accentuating shoulder breadth while tapering at the natural waistline. Paired with genuine horn buttons and Italian cupro lining, it transitions seamlessly from boardroom to evening galas.</p>

      <h3>Styling Note: The East-West Power Look</h3>
      <p>Layer the tailored blazer over a crisp linen kurta or high-neck slip dress for an editorial fusion aesthetic that balances sharp structure with fluid elegance.</p>
    `,
    relatedProductId: "wt-01"
  },
  {
    id: "blog-03",
    title: "Raw Selvedge Denim: A Heritage Built to Last Decades",
    category: "American Denim Heritage",
    date: "June 2026",
    readTime: "6 min read",
    author: "David Miller (Denim Specialist, Brooklyn Atelier)",
    image: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1200&q=85",
    excerpt: "Why 14oz shuttle-loom selvedge denim woven with authentic copper shanks fades into a personalized piece of living art.",
    content: `
      <p>Unlike mass-produced fast-fashion jeans made on wide projectile looms, <strong>Selvedge Denim</strong> is woven on vintage shuttle looms at slow speeds. This tight, self-finished edge (the 'self-edge') prevents fraying and preserves the raw irregularities of the cotton yarn.</p>
      
      <h3>The Fading Journey</h3>
      <p>When you wear an unwashed raw selvedge trucker jacket, the natural indigo dye slowly rubs off at stress points—the elbows, collar, and chest pockets—revealing crisp white cotton undertones unique to your daily routine.</p>
    `,
    relatedProductId: "us-01"
  }
];

// ==================== EDITORIAL RUNWAY LOOKBOOKS ====================
const LOOKBOOKS_DATA = [
  {
    id: "look-01",
    title: "The Silk Road Revival",
    subtitle: "When Parisian Architecture Meets Lahore Hand-Embroideries",
    tag: "Editorial Vol. 01",
    image: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=1200&q=85",
    quote: "Fashion is the language that transcends borders. Raw silk juxtaposed against modern tailored lines.",
    featuredProductIds: ["pk-01", "wt-01", "pk-02"]
  },
  {
    id: "look-02",
    title: "Nocturne & Noir",
    subtitle: "High-Octane Evening Silhouettes from Milan to Karachi",
    tag: "Editorial Vol. 02",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85",
    quote: "Effortless glamor in fluid silks and structured velvet tailored to perfection.",
    featuredProductIds: ["wt-02", "pk-03", "wt-03"]
  },
  {
    id: "look-03",
    title: "Urban Heritage Metropole",
    subtitle: "New York Streetwear x East Asian Minimalism",
    tag: "Editorial Vol. 03",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85",
    quote: "Heavyweight unwashed selvedge layered with airy kimono cuts for the modern global nomad.",
    featuredProductIds: ["us-01", "as-01", "us-02"]
  }
];

// ==================== CLIENT TESTIMONIALS ====================
const TESTIMONIALS_DATA = [
  {
    author: "Zoya Alvi",
    city: "Karachi & London",
    role: "Fashion Stylist",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "The embroidery detail on the Raw Silk Ensemble is on par with high-end luxury bridal houses like Khaadi Khaas and Sabyasachi. Truly world-class finish and rapid international delivery."
  },
  {
    author: "Elena Rostova",
    city: "Milan, Italy",
    role: "Creative Director",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "The Milano Double-Breasted Blazer fits as if bespoke-tailored on Savile Row. The lapel structure and wool drape are second to none in this price bracket."
  },
  {
    author: "Hamza Tariq",
    city: "Lahore, Pakistan",
    role: "Architect",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "Ordered the Shahzada Velvet Sherwani for my brother's reception. The handwork, cut, and brass buttons commanded attention the entire evening."
  },
  {
    author: "Marcus Vance",
    city: "New York, USA",
    role: "Brand Strategist",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    text: "The Brooklyn Selvedge Jacket has that authentic raw rigidity that fades into pure personal art. Luxe Couture bridges culture and street luxury seamlessly."
  }
];

// ==================== BRAND CRAFTSMANSHIP PILLARS ====================
const BRAND_STORIES = [
  {
    year: "Artisanal Craft",
    title: "300+ Heritage Guild Artisans",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    text: "We partner directly with multigenerational master weavers and zardozi craftsmen across Lahore, Multan, and Jaipur, preserving traditional heritage arts with ethical fair wages."
  },
  {
    year: "Tailoring Excellence",
    title: "Savile Row & Milan Precision",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    text: "Every Western blazer and suit is constructed using half-canvas interlinings, horn buttons, and sculpted chest darting for unmatched silhouette drape."
  },
  {
    year: "Zero Compromise",
    title: "100% Pure Natural Fibers",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    text: "From 100% Mulberry Silk and Normandy Flax Linen to 14oz Japanese Selvedge Cotton and Egyptian Lawn, we never cut corners with synthetic polyesters."
  }
];
