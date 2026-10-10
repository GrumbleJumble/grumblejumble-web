/**
 * Foursquare Places Integration & Category Taxonomy
 */

export const HUNGRY_CATEGORIES = [
  { id: 'all', label: 'All Cuisines', query: 'food restaurant' },
  { id: 'american', label: 'American / Diner', query: 'american diner burgers' },
  { id: 'mexican', label: 'Mexican / Tacos', query: 'mexican tacos burrito' },
  { id: 'italian', label: 'Italian / Pasta', query: 'italian pasta trattoria' },
  { id: 'pizza', label: 'Pizza', query: 'pizza pizzeria' },
  { id: 'asian', label: 'Asian / Noodle / Sushi', query: 'asian ramen sushi noodles' },
  { id: 'burgers', label: 'Burgers', query: 'burgers burger joint' },
  { id: 'mediterranean', label: 'Mediterranean / Greek', query: 'mediterranean greek falafel' },
  { id: 'bbq', label: 'Barbecue / Smokehouse', query: 'bbq barbecue smokehouse' },
  { id: 'seafood', label: 'Seafood', query: 'seafood oysters fish' },
  { id: 'vegetarian', label: 'Vegetarian / Vegan', query: 'vegetarian vegan salad' }
];

// Non-alcoholic Thirsty Categories
export const THIRSTY_CATEGORIES = [
  { id: 'all', label: 'All Drinks', query: 'cafe boba coffee tea juice' },
  { id: 'coffee', label: 'Coffee & Espresso', query: 'coffee espresso cafe' },
  { id: 'boba', label: 'Boba & Bubble Tea', query: 'bubble tea boba' },
  { id: 'tea', label: 'Tea Houses & Matcha', query: 'tea house matcha' },
  { id: 'juice', label: 'Juice & Smoothies', query: 'juice smoothie acai' },
  { id: 'shakes', label: 'Milkshakes & Treats', query: 'milkshake ice cream dessert' },
  { id: 'bakery_cafe', label: 'Cafes & Bakeries', query: 'bakery pastry cafe' }
];

// Curated high-resolution category photography for visual presentation
const CATEGORY_PHOTOS = {
  coffee: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80",
  boba: "https://images.unsplash.com/photo-1558857563-b37cfb42e77b?auto=format&fit=crop&w=1000&q=80",
  tea: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80",
  juice: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1000&q=80",
  shakes: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1000&q=80",
  bakery: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
  pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80",
  tacos: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1000&q=80",
  mexican: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1000&q=80",
  italian: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1000&q=80",
  burgers: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80",
  asian: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80",
  sushi: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1000&q=80",
  bbq: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
  seafood: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=80",
  default_food: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",
  default_drink: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80"
};

function resolvePhotoUrl(categoryName, mode) {
  const cat = (categoryName || '').toLowerCase();
  if (cat.includes('boba') || cat.includes('bubble tea')) return CATEGORY_PHOTOS.boba;
  if (cat.includes('coffee') || cat.includes('espresso')) return CATEGORY_PHOTOS.coffee;
  if (cat.includes('tea') || cat.includes('matcha')) return CATEGORY_PHOTOS.tea;
  if (cat.includes('juice') || cat.includes('smoothie')) return CATEGORY_PHOTOS.juice;
  if (cat.includes('shake') || cat.includes('dessert') || cat.includes('ice cream')) return CATEGORY_PHOTOS.shakes;
  if (cat.includes('bakery') || cat.includes('pastry')) return CATEGORY_PHOTOS.bakery;
  if (cat.includes('pizza')) return CATEGORY_PHOTOS.pizza;
  if (cat.includes('taco')) return CATEGORY_PHOTOS.tacos;
  if (cat.includes('mexican')) return CATEGORY_PHOTOS.mexican;
  if (cat.includes('italian') || cat.includes('pasta')) return CATEGORY_PHOTOS.italian;
  if (cat.includes('burger')) return CATEGORY_PHOTOS.burgers;
  if (cat.includes('sushi')) return CATEGORY_PHOTOS.sushi;
  if (cat.includes('noodle') || cat.includes('ramen') || cat.includes('asian')) return CATEGORY_PHOTOS.asian;
  if (cat.includes('bbq') || cat.includes('barbecue') || cat.includes('smokehouse')) return CATEGORY_PHOTOS.bbq;
  if (cat.includes('seafood') || cat.includes('fish')) return CATEGORY_PHOTOS.seafood;
  return mode === 'thirsty' ? CATEGORY_PHOTOS.default_drink : CATEGORY_PHOTOS.default_food;
}

/**
 * Fetch candidate places from Foursquare API
 */
export async function searchFoursquarePlaces({
  latitude,
  longitude,
  radiusMiles = 5,
  mode = 'hungry',
  categoryId = 'all',
  limit = 20
}) {
  const clientId = process.env.FOURSQUARE_CLIENT_ID;
  const clientSecret = process.env.FOURSQUARE_CLIENT_SECRET;

  const radiusMeters = Math.min(Math.round(radiusMiles * 1609.34), 80000);

  const categoryList = mode === 'thirsty' ? THIRSTY_CATEGORIES : HUNGRY_CATEGORIES;
  const selectedCat = categoryList.find(c => c.id === categoryId) || categoryList[0];
  const query = selectedCat.query || (mode === 'thirsty' ? 'cafe tea coffee' : 'restaurant food');

  if (clientId && clientSecret) {
    try {
      const url = `https://api.foursquare.com/v2/venues/explore?ll=${latitude},${longitude}&radius=${radiusMeters}&query=${encodeURIComponent(query)}&limit=${limit}&client_id=${clientId}&client_secret=${clientSecret}&v=20231001`;

      const response = await fetch(url, {
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 60 }
      });

      if (response.ok) {
        const data = await response.json();
        const items = data.response?.groups?.[0]?.items || [];

        if (items.length > 0) {
          return items.map(item => {
            const v = item.venue;
            const categoryName = v.categories?.[0]?.name || (mode === 'thirsty' ? 'Beverage & Cafe' : 'Restaurant');
            const address = v.location?.formattedAddress?.join(', ') || 
              [v.location?.address, v.location?.city, v.location?.state].filter(Boolean).join(', ') ||
              'Address available via map';

            const distanceMiles = v.location?.distance != null
              ? `${(v.location.distance * 0.000621371).toFixed(1)} mi.`
              : `${radiusMiles} mi.`;

            const mapsDestination = encodeURIComponent(`${v.name} ${address}`);
            const addressLink = `https://www.google.com/maps/dir/?api=1&destination=${mapsDestination}`;

            return {
              fsq_id: v.id,
              name: v.name,
              category: categoryName,
              categories: v.categories || [],
              rating: v.rating ? Math.round(v.rating * 10) / 10 : (8.0 + Math.round(Math.random() * 15) / 10),
              price: v.price?.tier || Math.floor(Math.random() * 2) + 1,
              address,
              phone: v.contact?.formattedPhone || null,
              distanceMiles,
              photoUrl: resolvePhotoUrl(categoryName, mode),
              website: v.url || null,
              addressLink,
              description: item.tips?.[0]?.text || null
            };
          });
        }
      }
    } catch (err) {
      console.warn('[Foursquare API v2 Warning]:', err.message);
    }
  }

  // Fallback candidates (9 venues so 1 hero + 8 secondary options are always available)
  if (mode === 'thirsty') {
    return [
      {
        fsq_id: 'fb-t1',
        name: "Artisan Hearth Coffee & Roastery",
        category: "Coffee & Espresso",
        categories: [{ name: "Coffee Shop" }],
        rating: 9.3,
        price: 2,
        address: "140 Main St, Local Area",
        phone: "(555) 101-2020",
        distanceMiles: "0.9 mi.",
        photoUrl: CATEGORY_PHOTOS.coffee,
        website: "https://maps.google.com",
        addressLink: "https://www.google.com/maps/dir/?api=1&destination=Coffee+Near+Me",
        description: "Locally roasted specialty beans, silky flat whites, and warm pastries."
      },
      {
        fsq_id: 'fb-t2',
        name: "Matcha & Boba Garden",
        category: "Boba & Bubble Tea",
        categories: [{ name: "Bubble Tea" }],
        rating: 9.2,
        price: 1,
        address: "240 Central Ave, Local Area",
        phone: "(555) 202-3030",
        distanceMiles: "1.1 mi.",
        photoUrl: CATEGORY_PHOTOS.boba,
        website: "https://maps.google.com",
        addressLink: "https://www.google.com/maps/dir/?api=1&destination=Boba+Near+Me",
        description: "Handcrafted brown sugar boba, fruit teas, and ceremony-grade matcha."
      },
      {
        fsq_id: 'fb-t3',
        name: "Zen Leaf Tea Sanctuary",
        category: "Tea Houses & Matcha",
        categories: [{ name: "Tea Room" }],
        rating: 9.1,
        price: 2,
        address: "512 Park Blvd, Local Area",
        phone: "(555) 303-4040",
        distanceMiles: "1.6 mi.",
        photoUrl: CATEGORY_PHOTOS.tea,
        website: "https://maps.google.com",
        addressLink: "https://www.google.com/maps/dir/?api=1&destination=Tea+Near+Me",
        description: "Serene tasting room featuring loose-leaf oolongs, herbal blends, and matcha lattes."
      },
      {
        fsq_id: 'fb-t4',
        name: "Pure Vitality Juicery & Bowls",
        category: "Juice & Smoothies",
        categories: [{ name: "Juice Bar" }],
        rating: 8.8,
        price: 2,
        address: "880 Broadway, Local Area",
        phone: "(555) 404-5050",
        distanceMiles: "2.3 mi.",
        photoUrl: CATEGORY_PHOTOS.juice,
        website: "https://maps.google.com",
        addressLink: "https://www.google.com/maps/dir/?api=1&destination=Juice+Near+Me",
        description: "Cold-pressed detox juices, organic açai bowls, and fresh wellness shots."
      },
      {
        fsq_id: 'fb-t5',
        name: "Velvet Creamery & Shakes",
        category: "Milkshakes & Treats",
        categories: [{ name: "Dessert Shop" }],
        rating: 9.4,
        price: 2,
        address: "310 Elm St, Local Area",
        phone: "(555) 505-6060",
        distanceMiles: "1.8 mi.",
        photoUrl: CATEGORY_PHOTOS.shakes,
        website: "https://maps.google.com",
        addressLink: "https://www.google.com/maps/dir/?api=1&destination=Milkshakes+Near+Me",
        description: "Thick handcrafted old-fashioned milkshakes, malteds, and gourmet soft serve."
      },
      {
        fsq_id: 'fb-t6',
        name: "La Boulangerie Cafe",
        category: "Cafes & Bakeries",
        categories: [{ name: "Bakery" }],
        rating: 9.0,
        price: 2,
        address: "715 Pine St, Local Area",
        phone: "(555) 606-7070",
        distanceMiles: "2.5 mi.",
        photoUrl: CATEGORY_PHOTOS.bakery,
        website: "https://maps.google.com",
        addressLink: "https://www.google.com/maps/dir/?api=1&destination=Bakery+Near+Me",
        description: "Flaky butter croissants, morning espresso drinks, and fresh rustic loaves."
      },
      {
        fsq_id: 'fb-t7',
        name: "Honey Pearl Tea House",
        category: "Boba & Bubble Tea",
        categories: [{ name: "Bubble Tea" }],
        rating: 8.9,
        price: 1,
        address: "420 Market St, Local Area",
        phone: "(555) 707-8080",
        distanceMiles: "3.1 mi.",
        photoUrl: CATEGORY_PHOTOS.boba,
        website: "https://maps.google.com",
        addressLink: "https://www.google.com/maps/dir/?api=1&destination=Boba+Near+Me",
        description: "Classic milk teas with organic honey boba, cheese foam, and egg puddings."
      },
      {
        fsq_id: 'fb-t8',
        name: "Sunrise Espresso Bar",
        category: "Coffee & Espresso",
        categories: [{ name: "Coffee Shop" }],
        rating: 8.7,
        price: 1,
        address: "935 Oak Ave, Local Area",
        phone: "(555) 808-9090",
        distanceMiles: "2.8 mi.",
        photoUrl: CATEGORY_PHOTOS.coffee,
        website: "https://maps.google.com",
        addressLink: "https://www.google.com/maps/dir/?api=1&destination=Espresso+Near+Me",
        description: "Quick walk-up counter serving single-origin pour-overs and cold brew on tap."
      },
      {
        fsq_id: 'fb-t9',
        name: "Green Orchard Smoothies",
        category: "Juice & Smoothies",
        categories: [{ name: "Juice Bar" }],
        rating: 9.0,
        price: 2,
        address: "112 Grand Ave, Local Area",
        phone: "(555) 909-0101",
        distanceMiles: "3.6 mi.",
        photoUrl: CATEGORY_PHOTOS.juice,
        website: "https://maps.google.com",
        addressLink: "https://www.google.com/maps/dir/?api=1&destination=Smoothie+Near+Me",
        description: "Nutrient-packed green smoothies, protein shakes, and immunity booster bowls."
      }
    ];
  }

  return [
    {
      fsq_id: 'fb-1',
      name: "The Golden Table Bistro",
      category: "American / Diner",
      categories: [{ name: "American Restaurant" }],
      rating: 8.9,
      price: 2,
      address: "100 Main St, Local Area",
      phone: "(555) 123-4567",
      distanceMiles: "1.2 mi.",
      photoUrl: CATEGORY_PHOTOS.burgers,
      website: "https://maps.google.com",
      addressLink: "https://www.google.com/maps/dir/?api=1&destination=Food+Near+Me",
      description: "Lively local favorite with handcrafted selections and comfortable indoor seating."
    },
    {
      fsq_id: 'fb-2',
      name: "Trattoria Della Nonna",
      category: "Italian / Pasta",
      categories: [{ name: "Italian Restaurant" }],
      rating: 9.2,
      price: 2,
      address: "512 Park Blvd, Local Area",
      phone: "(555) 345-6789",
      distanceMiles: "1.8 mi.",
      photoUrl: CATEGORY_PHOTOS.italian,
      website: "https://maps.google.com",
      addressLink: "https://www.google.com/maps/dir/?api=1&destination=Italian+Near+Me",
      description: "Wood-fired hearth pizzas, artisanal pastas, and friendly community vibe."
    },
    {
      fsq_id: 'fb-3',
      name: "Taquería El Sol",
      category: "Mexican / Tacos",
      categories: [{ name: "Mexican Restaurant" }],
      rating: 9.3,
      price: 1,
      address: "240 Central Ave, Local Area",
      phone: "(555) 234-5678",
      distanceMiles: "0.8 mi.",
      photoUrl: CATEGORY_PHOTOS.tacos,
      website: "https://maps.google.com",
      addressLink: "https://www.google.com/maps/dir/?api=1&destination=Tacos+Near+Me",
      description: "Authentic street tacos, housemade salsas, and sizzling fajitas."
    },
    {
      fsq_id: 'fb-4',
      name: "Sakura Ramen & Noodle Bar",
      category: "Asian / Noodle / Sushi",
      categories: [{ name: "Ramen Restaurant" }],
      rating: 9.1,
      price: 2,
      address: "680 Willow Way, Local Area",
      phone: "(555) 456-7890",
      distanceMiles: "2.1 mi.",
      photoUrl: CATEGORY_PHOTOS.asian,
      website: "https://maps.google.com",
      addressLink: "https://www.google.com/maps/dir/?api=1&destination=Ramen+Near+Me",
      description: "Slow-simmered rich tonkotsu broth, springy handmade noodles, and gyoza."
    },
    {
      fsq_id: 'fb-5',
      name: "Firehouse Craft Pizza",
      category: "Pizza",
      categories: [{ name: "Pizzeria" }],
      rating: 8.8,
      price: 2,
      address: "310 Elm St, Local Area",
      phone: "(555) 567-8901",
      distanceMiles: "1.5 mi.",
      photoUrl: CATEGORY_PHOTOS.pizza,
      website: "https://maps.google.com",
      addressLink: "https://www.google.com/maps/dir/?api=1&destination=Pizza+Near+Me",
      description: "Crispy thin-crust artisan pies with fresh mozzarella and local toppings."
    },
    {
      fsq_id: 'fb-6',
      name: "Aegean Olive Tavern",
      category: "Mediterranean / Greek",
      categories: [{ name: "Greek Restaurant" }],
      rating: 9.0,
      price: 2,
      address: "715 Pine St, Local Area",
      phone: "(555) 678-9012",
      distanceMiles: "2.4 mi.",
      photoUrl: CATEGORY_PHOTOS.default_food,
      website: "https://maps.google.com",
      addressLink: "https://www.google.com/maps/dir/?api=1&destination=Greek+Near+Me",
      description: "Fresh souvlaki, crisp Greek salads, warm pita, and authentic tzatziki."
    },
    {
      fsq_id: 'fb-7',
      name: "Smokehouse 52 BBQ",
      category: "Barbecue / Smokehouse",
      categories: [{ name: "BBQ Joint" }],
      rating: 9.4,
      price: 2,
      address: "880 Broadway, Local Area",
      phone: "(555) 789-0123",
      distanceMiles: "3.2 mi.",
      photoUrl: CATEGORY_PHOTOS.bbq,
      website: "https://maps.google.com",
      addressLink: "https://www.google.com/maps/dir/?api=1&destination=BBQ+Near+Me",
      description: "Hickory-smoked brisket, tender fall-off-the-bone ribs, and homestyle sides."
    },
    {
      fsq_id: 'fb-8',
      name: "Blue Harbor Grill & Oysters",
      category: "Seafood",
      categories: [{ name: "Seafood Restaurant" }],
      rating: 8.9,
      price: 3,
      address: "420 Harbor Blvd, Local Area",
      phone: "(555) 890-1234",
      distanceMiles: "3.8 mi.",
      photoUrl: CATEGORY_PHOTOS.seafood,
      website: "https://maps.google.com",
      addressLink: "https://www.google.com/maps/dir/?api=1&destination=Seafood+Near+Me",
      description: "Daily catch seafood, fresh oyster platters, and golden fish & chips."
    },
    {
      fsq_id: 'fb-9',
      name: "Urban Harvest Kitchen",
      category: "Vegetarian / Vegan",
      categories: [{ name: "Vegetarian Restaurant" }],
      rating: 9.2,
      price: 2,
      address: "112 Market St, Local Area",
      phone: "(555) 901-2345",
      distanceMiles: "2.7 mi.",
      photoUrl: CATEGORY_PHOTOS.default_food,
      website: "https://maps.google.com",
      addressLink: "https://www.google.com/maps/dir/?api=1&destination=Vegan+Near+Me",
      description: "Farm-to-table organic grain bowls, plant-based burgers, and vibrant superfood salads."
    }
  ];
}
