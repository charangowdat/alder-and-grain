export type MenuCategory = 'pastries' | 'sourdough' | 'espresso';

export interface BakeBatch {
  id: string;
  time: string;
  hour24: number;
  minute: number;
  title: string;
  items: string;
  category: MenuCategory;
  note: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  categoryLabel: string;
  price: number;
  batchTime: string;
  description: string;
  provenance: string;
  allergens: string;
  veganFriendly: boolean;
  nutFree: boolean;
  seasonalNote: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  role: string;
  neighborhood: string;
  date: string;
  quote: string;
  favoriteItem: string;
}

export interface StoreHourRow {
  days: string;
  hours: string;
  note: string;
}

export interface CateringPackage {
  id: string;
  name: string;
  servingRange: string;
  priceNote: string;
  summary: string;
}

export const BAKERY_IMAGES = {
  hero: '/src/assets/images/hero_bakery_hearth_1795668369642.jpg',
  pastries: '/src/assets/images/menu_pastries_viennoiserie_1795668369852.jpg',
  sourdough: '/src/assets/images/menu_sourdough_loaves_1795668369672.jpg',
  espresso: '/src/assets/images/menu_espresso_coffee_1795668368882.jpg',
  interior: '/src/assets/images/bakery_cafe_interior_1795668371152.jpg',
} as const;

export const CATEGORY_SHOWCASE: Record<'all' | MenuCategory, {
  title: string;
  subtitle: string;
  image: string;
  alt: string;
}> = {
  all: {
    title: 'Autumn & Early Winter Counter',
    subtitle: 'Stone-milled heritage grains, cultured Normandy-style butter, and single-origin espresso dialed each morning.',
    image: BAKERY_IMAGES.pastries,
    alt: 'Flaky croissants, Swedish cardamom knots, and fig almond galettes on a stoneware platter',
  },
  pastries: {
    title: 'Laminated Viennoiserie & Hearth Galettes',
    subtitle: 'Three-day cold-fermented dough laminated with grass-fed cultured butter and seasonal orchard fruit.',
    image: BAKERY_IMAGES.pastries,
    alt: 'Flaky croissants, Swedish cardamom knots, and fig almond galettes on a stoneware platter',
  },
  sourdough: {
    title: 'Naturally Leavened Hearth Loaves',
    subtitle: '36-hour cold fermentation using freshly stone-milled Skagit Valley wheat, rye, and sea salt.',
    image: BAKERY_IMAGES.sourdough,
    alt: 'Crusty country sourdough boules and seeded rye loaves dusted with flour on an oak table',
  },
  espresso: {
    title: 'Single-Origin Espresso & Seasonal Tonics',
    subtitle: 'Pulled at 9 bars on our custom brass-group machine with house-made botanical syrups and local dairy or oat milk.',
    image: BAKERY_IMAGES.espresso,
    alt: 'Ceramic cup of flat white with microfoam art beside an iced espresso tonic with orange peel',
  },
};

export const BAKE_SCHEDULE: BakeBatch[] = [
  {
    id: 'batch-0630',
    time: '06:30',
    hour24: 6,
    minute: 30,
    title: 'First Viennoiserie Pull',
    items: 'Butter Croissants, Pain au Chocolat, Cardamom Knots',
    category: 'pastries',
    note: 'Baked crisp as the doors open',
  },
  {
    id: 'batch-0730',
    time: '07:30',
    hour24: 7,
    minute: 30,
    title: 'Morning Hearth Loaves',
    items: 'Ballard Country Levain, Nordic Seeded Rye',
    category: 'sourdough',
    note: 'Best sliced after 20 min cooling',
  },
  {
    id: 'batch-0930',
    time: '09:30',
    hour24: 9,
    minute: 30,
    title: 'Orchard Fruit & Galettes',
    items: 'Black Mission Fig Almond Galette, Pear Buckwheat Tart',
    category: 'pastries',
    note: 'Limited weekend & late-morning tray',
  },
  {
    id: 'batch-1130',
    time: '11:30',
    hour24: 11,
    minute: 30,
    title: 'Midday Focaccia & Baguettes',
    items: 'Rosemary Sea Salt Focaccia, Demi-Baguettes, Olive Fougasse',
    category: 'sourdough',
    note: 'Warm from the deck oven for lunch',
  },
  {
    id: 'batch-1400',
    time: '14:00',
    hour24: 14,
    minute: 0,
    title: 'Afternoon Espresso & Sweet Pull',
    items: 'Brown Butter Kouign-Amann, Seasonal Espresso Pairings',
    category: 'espresso',
    note: 'Paired with single-origin afternoon shots',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'pastry-croissant',
    name: 'Cultured Butter Croissant',
    category: 'pastries',
    categoryLabel: 'Pastries',
    price: 5.25,
    batchTime: '06:30',
    description: '27-layer laminated pastry folded with 84% butterfat grass-fed cultured butter and organic Washington pastry flour.',
    provenance: 'Fairhaven Organic Mill Red Fife & Straus Creamery Butter',
    allergens: 'Wheat, Dairy, Eggs',
    veganFriendly: false,
    nutFree: true,
    seasonalNote: 'Signature daily bake',
  },
  {
    id: 'pastry-cardamom',
    name: 'Braided Swedish Cardamom Knot',
    category: 'pastries',
    categoryLabel: 'Pastries',
    price: 5.75,
    batchTime: '06:30',
    description: 'Brioche dough twisted with freshly mortar-ground green cardamom pods, brown butter, and crushed Swedish pearl sugar.',
    provenance: 'Freshly cracked green Guatemalan cardamom & local honey glaze',
    allergens: 'Wheat, Dairy, Eggs',
    veganFriendly: false,
    nutFree: true,
    seasonalNote: 'Morning counter staple',
  },
  {
    id: 'pastry-fig-galette',
    name: 'Black Mission Fig & Almond Galette',
    category: 'pastries',
    categoryLabel: 'Pastries',
    price: 6.50,
    batchTime: '09:30',
    description: 'Flaky spelt-butter crust filled with toasted marzipan frangipane, roasted late-autumn figs, and thyme blossom honey.',
    provenance: 'Yakima Valley orchard figs & stone-ground spelt',
    allergens: 'Wheat, Dairy, Eggs, Tree Nuts (Almond)',
    veganFriendly: false,
    nutFree: false,
    seasonalNote: 'Autumn Harvest',
  },
  {
    id: 'pastry-kouign',
    name: 'Brown Butter Kouign-Amann',
    category: 'pastries',
    categoryLabel: 'Pastries',
    price: 6.00,
    batchTime: '14:00',
    description: 'Caramelized Breton pastry laminated with flaky San Juan sea salt and browned butter for a shatteringly crisp sugar shell.',
    provenance: 'San Juan Island Sea Salt & browned butter',
    allergens: 'Wheat, Dairy',
    veganFriendly: false,
    nutFree: true,
    seasonalNote: 'Afternoon 14:00 oven pull',
  },
  {
    id: 'loaf-country-levain',
    name: 'Ballard Country Levain',
    category: 'sourdough',
    categoryLabel: 'Sourdough Loaves',
    price: 10.50,
    batchTime: '07:30',
    description: '900g hearth boule fermented 36 hours with our 11-year-old levain, stone-milled Red Fife, and crisp blistered crust.',
    provenance: '85% Edison White Wheat · 15% Whole Red Fife (Skagit Valley)',
    allergens: 'Wheat',
    veganFriendly: true,
    nutFree: true,
    seasonalNote: 'Whole or half loaf',
  },
  {
    id: 'loaf-seeded-rye',
    name: 'Nordic Seeded Dark Rye',
    category: 'sourdough',
    categoryLabel: 'Sourdough Loaves',
    price: 11.50,
    batchTime: '07:30',
    description: 'Dense, malty pan loaf packed with toasted pumpkin seeds, sunflower, golden flax, fennel, and cracked rye berries.',
    provenance: '100% Stone-milled Danko Rye & toasted organic seeds',
    allergens: 'Wheat, Rye',
    veganFriendly: true,
    nutFree: true,
    seasonalNote: 'Keeps fresh 6 days',
  },
  {
    id: 'loaf-rosemary-focaccia',
    name: 'Rosemary & Roasted Garlic Focaccia',
    category: 'sourdough',
    categoryLabel: 'Sourdough Loaves',
    price: 9.00,
    batchTime: '11:30',
    description: 'High-hydration sourdough slab dimpled with cold-pressed olive oil, garden rosemary needles, confit garlic, and flaky salt.',
    provenance: 'California Arbequina extra-virgin olive oil',
    allergens: 'Wheat',
    veganFriendly: true,
    nutFree: true,
    seasonalNote: 'Pulled warm at 11:30',
  },
  {
    id: 'loaf-walnut-cranberry',
    name: 'Toasted Walnut & Tart Cranberry Batard',
    category: 'sourdough',
    categoryLabel: 'Sourdough Loaves',
    price: 12.00,
    batchTime: '09:30',
    description: 'Naturally leavened country dough folded with Oregon Chandler walnuts and unsweetened Pacific coast bog cranberries.',
    provenance: 'Willamette Valley walnuts & Long Beach Peninsula cranberries',
    allergens: 'Wheat, Tree Nuts (Walnut)',
    veganFriendly: true,
    nutFree: false,
    seasonalNote: 'Autumn / Winter Seasonal',
  },
  {
    id: 'espresso-flat-white',
    name: 'Velvet Flat White',
    category: 'espresso',
    categoryLabel: 'Espresso Drinks',
    price: 5.25,
    batchTime: 'All Day',
    description: 'Double ristretto of our seasonal Huila Colombia roast topped with 6 oz of steamed local milk or creamy barista oat milk.',
    provenance: 'Finca El Mirador, Huila · Tasting notes: toasted hazelnut & dark plum',
    allergens: 'Dairy (Oat option available)',
    veganFriendly: true,
    nutFree: true,
    seasonalNote: 'House classic',
  },
  {
    id: 'espresso-cardamom-cortado',
    name: 'Smoked Maple & Cardamom Cortado',
    category: 'espresso',
    categoryLabel: 'Espresso Drinks',
    price: 5.75,
    batchTime: 'All Day',
    description: 'Equal parts double espresso and textured milk lightly sweetened with wood-smoked Vermont maple and steeped cardamom.',
    provenance: 'House-infused maple botanical syrup',
    allergens: 'Dairy (Oat option available)',
    veganFriendly: true,
    nutFree: true,
    seasonalNote: 'Winter Bar Feature',
  },
  {
    id: 'espresso-tonic',
    name: 'Seville Orange Espresso Tonic',
    category: 'espresso',
    categoryLabel: 'Espresso Drinks',
    price: 6.25,
    batchTime: 'All Day',
    description: 'Bright Ethiopian washed espresso layered over chilled botanical quinine tonic water with expressed Seville orange peel.',
    provenance: 'Yirgacheffe Kochere · Notes of bergamot, jasmine & citrus',
    allergens: 'None',
    veganFriendly: true,
    nutFree: true,
    seasonalNote: 'Served over hand-cut ice',
  },
  {
    id: 'espresso-filter',
    name: 'Single-Origin Batch & Pour-Over',
    category: 'espresso',
    categoryLabel: 'Espresso Drinks',
    price: 4.50,
    batchTime: 'All Day',
    description: 'Freshly ground every 45 minutes or brewed to order via V60 ceramic dripper; ask our baristas for today’s micro-lot.',
    provenance: 'Roasted 4 miles south in Georgetown',
    allergens: 'None',
    veganFriendly: true,
    nutFree: true,
    seasonalNote: 'Refills $2.00 dine-in',
  },
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Hannah Lindqvist',
    role: 'Architect',
    neighborhood: 'Olson & Partners, Ballard',
    date: 'October 2026',
    quote: 'We order three dozen cardamom knots and two coffee totes every Thursday studio critique. The pastry lamination stays crisp past noon, and the country levain has the best blistered crust north of the Ship Canal.',
    favoriteItem: 'Braided Swedish Cardamom Knot',
  },
  {
    id: 'rev-2',
    name: 'Marcus Delgado',
    role: 'Marine Diesel Technician',
    neighborhood: 'Fishermen’s Terminal',
    date: 'November 2026',
    quote: 'Doors open right at 6:30 AM before my dock shift. Watching the first trays of croissants come off the rack while they pull a clean, sweet flat white is the single best 10 minutes of my morning.',
    favoriteItem: 'Velvet Flat White',
  },
  {
    id: 'rev-3',
    name: 'Priya Subramanian',
    role: 'Culinary Instructor',
    neighborhood: 'Phinney Ridge',
    date: 'September 2026',
    quote: 'You can taste the freshly stone-milled Skagit grain in every slice of the Nordic Seeded Rye. It has genuine fermentation depth without harsh acidity, and it keeps beautifully on the counter all week.',
    favoriteItem: 'Nordic Seeded Dark Rye',
  },
];

export const STORE_HOURS: StoreHourRow[] = [
  {
    days: 'Tuesday – Friday',
    hours: '06:30 – 16:00',
    note: 'Full espresso bar until 15:45 · Lunch focaccia at 11:30',
  },
  {
    days: 'Saturday – Sunday',
    hours: '07:00 – 17:00',
    note: 'Extended weekend pastry trays · Pre-order pickup 08:00–13:00',
  },
  {
    days: 'Monday',
    hours: 'Closed',
    note: 'Reserved for grain milling, starter feeding & staff cupping',
  },
];

export const CATERING_PACKAGES: CateringPackage[] = [
  {
    id: 'morning-pastry-crate',
    name: 'Morning Viennoiserie Crate',
    servingRange: '12 – 60 guests',
    priceNote: '$14 / guest',
    summary: 'Assorted butter croissants, cardamom knots, and seasonal fruit galettes packed warm in compostable parchment boxes.',
  },
  {
    id: 'hearth-loaf-board',
    name: 'Hearth Loaf & Focaccia Spread',
    servingRange: '10 – 45 guests',
    priceNote: '$16 / guest',
    summary: 'Sliced Country Levain, Nordic Seeded Rye, and warm Rosemary Focaccia served with cultured sea-salt butter and seasonal jam.',
  },
  {
    id: 'espresso-coffee-service',
    name: 'Batch Brew & Coffee Tote Service',
    servingRange: '12 – 80 guests',
    priceNote: '$38 / 96 oz tote',
    summary: 'Single-origin filter coffee totes with local dairy, barista oat milk, organic cane sugar, and ceramic-lined cups.',
  },
];

export const STORE_INFO = {
  name: 'Alder & Grain',
  addressLine1: '5412 Ballard Ave NW',
  addressLine2: 'Seattle, WA 98107',
  phone: '(206) 555-0148',
  email: 'hello@alderandgrain.com',
  mapsUrl: 'https://maps.google.com/?q=5412+Ballard+Ave+NW+Seattle+WA+98107',
};
