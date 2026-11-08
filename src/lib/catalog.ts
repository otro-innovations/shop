/**
 * Shop OTRO — static product catalog.
 * ─────────────────────────────────────────────────────────────────────────────
 * Deliberately dependency-free and file-based: no CMS, no network calls, no
 * external image hosts. Product imagery is rendered as a styled gradient/letter
 * placeholder (see components/ProductMedia.tsx) so the build never depends on
 * remote assets. Swap this module for an API/CMS later without touching pages.
 */

export interface ProductVariants {
  /** Selectable sizes/labels (non-functional: they do not change price or stock). */
  sizes?: string[];
  /** Selectable colour names (non-functional: display selection only). */
  colors?: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  /** Price in Bangladeshi Taka (integer — no poisha). */
  priceBdt: number;
  shortDescription: string;
  /** Exactly three selling points, rendered as a bullet list. */
  highlights: [string, string, string];
  variants: ProductVariants;
  /** Optional merchandising label ("Best seller", "New"). Never fake urgency. */
  badge?: string;
  stockLabel: string;
}

export const products: Product[] = [
  {
    id: 'prod-cotton-panjabi',
    slug: 'cotton-panjabi',
    name: 'Cotton Panjabi',
    category: "Men's Apparel",
    priceBdt: 1890,
    shortDescription:
      'A breathable, mid-weight cotton panjabi with a clean straight cut — comfortable for Eid gatherings, office days and everyday wear.',
    highlights: [
      'Mid-weight cotton that keeps its shape after washing',
      'Straight cut with side slits for easy movement',
      'Colour-fast dye; machine washable in cold water',
    ],
    variants: {
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Navy', 'Olive', 'Maroon'],
    },
    badge: 'Best seller',
    stockLabel: 'In stock — ships in 1–2 days',
  },
  {
    id: 'prod-cotton-kurti',
    slug: 'premium-cotton-kurti',
    name: 'Premium Cotton Kurti',
    category: "Women's Apparel",
    priceBdt: 1450,
    shortDescription:
      'Soft cotton kurti with a relaxed A-line drape and neat finishing — an easy piece for work, university and family occasions.',
    highlights: [
      'Lightweight cotton blend that breathes in Dhaka heat',
      'A-line cut with reinforced side seams',
      'Three-quarter sleeves; pockets on both sides',
    ],
    variants: {
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Indigo', 'Rust', 'Black', 'Teal'],
    },
    badge: 'Best seller',
    stockLabel: 'In stock — ships in 1–2 days',
  },
  {
    id: 'prod-jute-tote',
    slug: 'handwoven-jute-tote',
    name: 'Handwoven Jute Tote',
    category: 'Bags & Accessories',
    priceBdt: 690,
    shortDescription:
      'A sturdy everyday tote woven from locally sourced jute, sized for groceries, books or a 13-inch laptop.',
    highlights: [
      'Natural jute with reinforced stitching at the handles',
      'Fits A4 files, a 13-inch laptop and daily essentials',
      'Made by small weaving workshops in Bangladesh',
    ],
    variants: {
      colors: ['Natural', 'Natural with navy trim'],
    },
    badge: 'New',
    stockLabel: 'In stock — ships in 1–2 days',
  },
  {
    id: 'prod-laptop-sleeve',
    slug: 'laptop-sleeve-14',
    name: 'Laptop Sleeve 14"',
    category: 'Bags & Accessories',
    priceBdt: 1290,
    shortDescription:
      'Padded 14-inch laptop sleeve with a water-resistant shell and a soft inner lining — protection without bulk.',
    highlights: [
      'Shock-absorbing foam padding on all four sides',
      'Water-resistant outer shell, scratch-free inner lining',
      'Slim enough to slide into a backpack or tote',
    ],
    variants: {
      colors: ['Charcoal', 'Navy', 'Stone'],
    },
    stockLabel: 'In stock — ships in 1–2 days',
  },
  {
    id: 'prod-steel-bottle',
    slug: 'stainless-steel-water-bottle-750ml',
    name: 'Stainless Steel Water Bottle 750 ml',
    category: 'Home & Kitchen',
    priceBdt: 890,
    shortDescription:
      'Double-wall stainless bottle that keeps water cold through a full Dhaka commute, with a leak-resistant screw cap.',
    highlights: [
      'Double-wall insulation — cold for hours, no outside sweating',
      'Food-grade stainless steel, BPA-free lid',
      '750 ml capacity; fits standard cup holders',
    ],
    variants: {
      colors: ['Steel', 'Matte Black'],
    },
    badge: 'Best seller',
    stockLabel: 'In stock — ships in 1–2 days',
  },
  {
    id: 'prod-mug-set',
    slug: 'ceramic-mug-set-2',
    name: 'Ceramic Mug Set (2 pcs)',
    category: 'Home & Kitchen',
    priceBdt: 1150,
    shortDescription:
      'Two stoneware mugs with a matte glaze and a comfortable handle — for morning tea and evening coffee at home.',
    highlights: [
      'Set of two 300 ml stoneware mugs',
      'Matte glaze outside, smooth glaze inside',
      'Microwave and dishwasher safe',
    ],
    variants: {
      colors: ['Sand', 'Slate'],
    },
    stockLabel: 'In stock — ships in 1–2 days',
  },
  {
    id: 'prod-bedsheet-king',
    slug: 'cotton-bedsheet-set',
    name: 'Cotton Bedsheet Set',
    category: 'Home & Kitchen',
    priceBdt: 2490,
    shortDescription:
      'Breathable cotton bedsheet with two pillow covers — a cool, crisp finish that softens with every wash.',
    highlights: [
      '100% cotton, 200 thread count weave',
      'Includes two matching pillow covers',
      'Colour-fast print; cold machine wash recommended',
    ],
    variants: {
      sizes: ['Queen', 'King'],
      colors: ['White', 'Sky', 'Grey'],
    },
    badge: 'Staff pick',
    stockLabel: 'In stock — ships in 1–2 days',
  },
  {
    id: 'prod-notebook-a5',
    slug: 'a5-notebook-leather-trim',
    name: 'A5 Notebook with Leather-Trim Cover',
    category: 'Stationery',
    priceBdt: 540,
    shortDescription:
      'A5 hardcover notebook with 160 pages of smooth 90 gsm paper and a vegan leather-trim spine — good for meetings and sketches.',
    highlights: [
      '160 pages of ink-friendly 90 gsm paper',
      'Lay-flat binding with a ribbon marker',
      'Elastic closure and inner back pocket',
    ],
    variants: {
      colors: ['Tan', 'Black'],
    },
    stockLabel: 'In stock — ships in 1–2 days',
  },
  {
    id: 'prod-earbuds',
    slug: 'wireless-earbuds',
    name: 'Wireless Earbuds',
    category: 'Electronics',
    priceBdt: 2990,
    shortDescription:
      'Everyday true-wireless earbuds with touch controls, a pocketable charging case and clear call audio.',
    highlights: [
      'Up to 5 hours playback; 20 hours with the case',
      'Touch controls for calls and playback',
      'USB-C charging; Bluetooth 5.3 pairing',
    ],
    variants: {
      colors: ['White', 'Black'],
    },
    badge: 'Limited stock',
    stockLabel: 'Limited stock — ships in 2–3 days',
  },
  {
    id: 'prod-black-tea',
    slug: 'organic-black-tea-250g',
    name: 'Organic Black Tea 250 g',
    category: 'Pantry',
    priceBdt: 480,
    shortDescription:
      'Strong, malty black tea from Sylhet gardens — 250 g of loose leaf for a proper morning cup.',
    highlights: [
      'Single-origin loose leaf from Sylhet',
      'Resealable foil pouch to protect aroma',
      '250 g — roughly 100 cups per pack',
    ],
    variants: {},
    stockLabel: 'In stock — ships in 1–2 days',
  },
];

/** Look up a product by URL slug. */
export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Look up a product by internal id (used by the cart, which stores ids). */
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/** Merchandising picks for the homepage best-seller grid. */
export const bestSellers: Product[] = products.filter((p) => p.badge === 'Best seller');

/** Hero showcase — first three products, deterministic order. */
export const featuredProducts: Product[] = products.slice(0, 3);

export interface ProductCategory {
  name: string;
  count: number;
}

/** Unique categories with product counts, preserving catalog order. */
export const productCategories: ProductCategory[] = products.reduce<ProductCategory[]>((acc, p) => {
  const existing = acc.find((c) => c.name === p.category);
  if (existing) existing.count += 1;
  else acc.push({ name: p.category, count: 1 });
  return acc;
}, []);

/** Single price formatter for the whole storefront — e.g. `BDT 1,290`. */
export function formatBdt(amount: number): string {
  return `BDT ${Math.round(amount).toLocaleString('en-US')}`;
}
