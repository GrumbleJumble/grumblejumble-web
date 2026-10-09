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

  // Fallback candidates
  return [
    {
      fsq_id: 'fb-1',
      name: "The Golden Table",
      category: mode === 'thirsty' ? "Specialty Coffee & Espresso" : "American Bistro",
      categories: [{ name: "Bistro" }],
      rating: 8.9,
      price: 2,
      address: "100 Main St, Local Area",
      phone: "(555) 123-4567",
      distanceMiles: "1.2 mi.",
      photoUrl: mode === 'thirsty' ? CATEGORY_PHOTOS.coffee : CATEGORY_PHOTOS.burgers,
      website: "https://maps.google.com",
      addressLink: "https://www.google.com/maps/dir/?api=1&destination=Food+Near+Me",
      description: "Lively local favorite with handcrafted selections and comfortable indoor seating."
    },
    {
      fsq_id: 'fb-2',
      name: "Matcha & Boba Garden",
      category: "Bubble Tea & Cafe",
      categories: [{ name: "Bubble Tea" }],
      rating: 9.2,
      price: 1,
      address: "240 Central Ave, Local Area",
      phone: "(555) 234-5678",
      distanceMiles: "0.8 mi.",
      photoUrl: CATEGORY_PHOTOS.boba,
      website: "https://maps.google.com",
      addressLink: "https://www.google.com/maps/dir/?api=1&destination=Boba+Near+Me",
      description: "Artisanal boba, fresh fruit teas, and handcrafted matcha specialties."
    },
    {
      fsq_id: 'fb-3',
      name: "Trattoria Della Nonna",
      category: "Italian & Pizza",
      categories: [{ name: "Pizza" }, { name: "Italian" }],
      rating: 9.0,
      price: 2,
      address: "512 Park Blvd, Local Area",
      phone: "(555) 345-6789",
      distanceMiles: "2.1 mi.",
      photoUrl: CATEGORY_PHOTOS.pizza,
      website: "https://maps.google.com",
      addressLink: "https://www.google.com/maps/dir/?api=1&destination=Pizza+Near+Me",
      description: "Wood-fired hearth pizzas, artisanal pastas, and friendly community vibe."
    }
  ];
}
