# GrumbleJumble 🎲🍽️

> **The cure for meal indecision.** Can't decide what to eat or drink? Pick whether you are hungry or thirsty, set your radius and group size, and let GrumbleJumble pick the perfect spot for you!

Originally created in 2021 by **Ivan Huang** and **Roy Jou**, GrumbleJumble has been completely re-engineered into a modern, sleek, minimalistic full-stack web application designed for fast zero-auth decision making.

---

## ✨ Features

- **🍔 Hungry vs 🧋 Thirsty Modes:** Seamlessly switch between food cuisines and non-alcoholic drinks (Coffee & Espresso, Boba & Bubble Tea, Matcha & Tea Houses, Juices & Smoothies, Milkshakes, Cafes & Bakeries).
- **👥 Smart Party Size Filtering Algorithm:** Arbitrary group sizing (**Solo**, **A Date / Duo**, **Small Crew**, **Large Gathering**) with an intelligent scoring heuristic that filters out unsuitable venues (e.g. prunes micro walk-up kiosks for large groups, boosts counter seating for solo dining).
- **🎯 1-Pick Focus with In-Memory Pool Caching:** Fetches a batch of 8–10 matching candidates behind the scenes. Presents 1 decisive pick to the user immediately, while enabling instant "Decide For Me Again" re-rolls without extra network calls.
- **📍 Multi-Tiered Geolocation:**
  - **Tier 1 (Automatic IP Geolocation):** Zero-permission instant city detection via Vercel Edge headers and IP lookup.
  - **Tier 2 (High-Accuracy GPS):** One-click button to use device GPS coordinates.
  - **Tier 3 (Manual Search Fallback):** Enter any city, neighborhood, or zip code.
- **🎨 Brand Identity & Minimalistic Aesthetic:**
  - Built with custom brand colors (`#3a7b8f`, `#5bc0de`, `#ed6c4f`, `#ffbd4f`) and gradients.
  - Official vector logo integration.
  - Fully self-hosted local `.woff2` typography (**Clarity City** as primary sans-serif and **Playwrite Argentina** for stylistic accents) for zero layout shifts and top Core Web Vitals.
- **⚡ Vercel Serverless Architecture:**
  - Zero external server or Heroku instance needed.
  - Secure serverless route handlers (`/api/jumble`, `/api/ip-geo`) running on the Vercel Node.js runtime, keeping API credentials completely private.
- **🔍 SEO & Accessibility (a11y):**
  - Full OpenGraph & Twitter Card previews.
  - Schema.org `WebApplication` JSON-LD structured data.
  - Dynamic `robots.txt` and `sitemap.xml`.
  - WCAG-compliant contrast, semantic HTML, and keyboard navigation.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Library:** [React 18](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Micro-interactions:** [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ (tested on Node.js 24)
- npm or pnpm

### 2. Environment Variables
Create a `.env.local` file in the root directory:

```bash
FOURSQUARE_CLIENT_ID=your_foursquare_client_id
FOURSQUARE_CLIENT_SECRET=your_foursquare_client_secret
FOURSQUARE_SERVICE_API_KEY=your_foursquare_api_key
```

### 3. Installation & Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

---

## ☁️ Deploying to Vercel

1. Push your repository to GitHub.
2. Import the project in the [Vercel Dashboard](https://vercel.com/new).
3. Add `FOURSQUARE_CLIENT_ID`, `FOURSQUARE_CLIENT_SECRET`, and `FOURSQUARE_SERVICE_API_KEY` to **Project Settings > Environment Variables**.
4. Deploy! Vercel will automatically build the Next.js app and deploy `/api/jumble` and `/api/ip-geo` as serverless functions.
