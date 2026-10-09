/**
 * Group Size Filtering and Scoring Algorithm for GrumbleJumble
 * 
 * Supports qualitative group size tiers:
 * - 'solo': Just Myself
 * - 'duo': A Date / 2 People
 * - 'friends': Small Crew / A few friends (3-5)
 * - 'large': Large Gathering / Big Group (6+)
 */

export const GROUP_SIZES = [
  { id: 'solo', label: 'Just Me', sub: 'Solo diner or quick stop', icon: 'User' },
  { id: 'duo', label: 'A Date / Duo', sub: 'Two people, intimate or casual', icon: 'Users' },
  { id: 'friends', label: 'Small Crew', sub: 'A few friends hanging out', icon: 'Users2' },
  { id: 'large', label: 'Large Group', sub: 'Party or family gathering (6+)', icon: 'PartyPopper' }
];

// Keywords indicating small, takeout-only, or micro venues
const MICRO_VENUE_KEYWORDS = [
  'kiosk', 'food stand', 'stand', 'cart', 'truck', 'walk-up', 'window', 'espresso bar',
  'counter only', 'micro', 'drive-thru only', 'hole in the wall'
];

// Keywords indicating large group friendly venues
const LARGE_VENUE_KEYWORDS = [
  'buffet', 'banquet', 'family style', 'bbq', 'barbecue', 'hot pot', 'hotpot',
  'pizza', 'brewery', 'beer garden', 'patio', 'outdoor seating', 'diner', 'dim sum',
  'food hall', 'hall', 'tavern', 'tavern & grill', 'grill & bar', 'cantina'
];

// Keywords indicating romantic or date-friendly spots
const DATE_VENUE_KEYWORDS = [
  'bistro', 'wine bar', 'trattoria', 'intimate', 'cozy', 'romantic', 'tasting',
  'dessert', 'patisserie', 'gelato', 'creperie', 'sushi', 'cocktail', 'lounge'
];

// Keywords indicating solo-friendly spots
const SOLO_VENUE_KEYWORDS = [
  'cafe', 'coffee', 'fast casual', 'noodle', 'ramen', 'counter', 'sandwich',
  'deli', 'bakery', 'poke', 'salad', 'smoothie', 'boba', 'tea', 'takeout'
];

/**
 * Filter and score candidate establishments based on the selected group size.
 * Returns establishments sorted by relevance score, omitting disqualified venues.
 * 
 * @param {Array} venues - Array of venue objects from Foursquare or fallback
 * @param {string} groupSize - One of 'solo', 'duo', 'friends', 'large'
 * @returns {Array} - Filtered and scored venues
 */
export function filterVenuesByGroupSize(venues, groupSize = 'friends') {
  if (!Array.isArray(venues) || venues.length === 0) return [];

  const evaluated = venues.map(venue => {
    let score = 50; // base score
    let disqualified = false;
    let matchReason = '';

    const name = (venue.name || '').toLowerCase();
    const categories = (venue.categories || []).map(c => (c.name || '').toLowerCase()).join(' ');
    const description = (venue.description || '').toLowerCase();
    const allText = `${name} ${categories} ${description}`;

    const isMicro = MICRO_VENUE_KEYWORDS.some(k => allText.includes(k));
    const isLargeFriendly = LARGE_VENUE_KEYWORDS.some(k => allText.includes(k));
    const isDateFriendly = DATE_VENUE_KEYWORDS.some(k => allText.includes(k));
    const isSoloFriendly = SOLO_VENUE_KEYWORDS.some(k => allText.includes(k));

    switch (groupSize) {
      case 'large':
        // For large groups, filter out micro venues with little to no seating
        if (isMicro) {
          disqualified = true;
          matchReason = 'Too small for large groups';
        } else if (isLargeFriendly) {
          score += 40;
          matchReason = 'Spacious & group-friendly seating';
        } else if (venue.price && venue.price >= 4) {
          score -= 20; // High-end fine dining often hard to accommodate walk-in large groups
          matchReason = 'Fine dining may require group reservations';
        } else {
          score += 10;
          matchReason = 'Standard group seating';
        }
        break;

      case 'solo':
        if (allText.includes('banquet') || allText.includes('family style platter only')) {
          disqualified = true;
          matchReason = 'Requires large group dining';
        } else if (isSoloFriendly) {
          score += 35;
          matchReason = 'Great solo dining & counter setup';
        } else if (isDateFriendly || isLargeFriendly) {
          score += 10;
          matchReason = 'Comfortable for solo visitors';
        } else {
          score += 5;
          matchReason = 'Casual solo dining';
        }
        break;

      case 'duo':
        if (isMicro) {
          score -= 10;
        }
        if (isDateFriendly) {
          score += 35;
          matchReason = 'Cozy & great for pairs';
        } else if (isSoloFriendly || isLargeFriendly) {
          score += 15;
          matchReason = 'Good casual spot for two';
        } else {
          score += 10;
          matchReason = 'Suitable for two';
        }
        break;

      case 'friends':
      default:
        if (isMicro && (allText.includes('drive-thru only') || allText.includes('kiosk'))) {
          disqualified = true;
          matchReason = 'No sit-down space for friends';
        } else if (isLargeFriendly || isDateFriendly || isSoloFriendly) {
          score += 25;
          matchReason = 'Fun & versatile vibe for friends';
        } else {
          score += 15;
          matchReason = 'Good group hangout';
        }
        break;
    }

    // Boost venues that have higher rating
    if (venue.rating) {
      score += Math.round(venue.rating * 3); // Foursquare rating is 0-10
    }

    return {
      ...venue,
      groupScore: score,
      disqualified,
      groupMatchReason: matchReason
    };
  });

  // Filter out disqualified venues unless that would leave too few results
  const qualified = evaluated.filter(v => !v.disqualified);
  const candidates = qualified.length >= 3 ? qualified : evaluated;

  // Add a slight randomized jitter (+- 5 points) so re-searching doesn't return static order
  return candidates
    .map(v => ({ ...v, sortScore: v.groupScore + (Math.random() * 10 - 5) }))
    .sort((a, b) => b.sortScore - a.sortScore);
}
