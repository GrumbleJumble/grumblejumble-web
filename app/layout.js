import './globals.css';

export const metadata = {
  metadataBase: new URL('https://grumblejumble.com'),
  title: 'GrumbleJumble — Can\'t Decide What to Eat or Drink?',
  description: 'GrumbleJumble takes the stress out of group indecision. Pick whether you are hungry or thirsty, set your distance and party size, and let us pick the perfect spot for you.',
  keywords: ['restaurant picker', 'random restaurant', 'food decision maker', 'where to eat', 'boba', 'coffee', 'group dining'],
  authors: [{ name: 'Ivan Huang' }, { name: 'Roy Jou' }],
  creator: 'GrumbleJumble',
  publisher: 'GrumbleJumble',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://grumblejumble.com',
    siteName: 'GrumbleJumble',
    title: 'GrumbleJumble — Pick Where to Eat or Drink Instantly',
    description: 'Solve meal indecision in one click. Tailored to your location, radius, and party size.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'GrumbleJumble Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GrumbleJumble — Can\'t Decide What to Eat or Drink?',
    description: 'Solve food indecisiveness instantly. Set your radius and group size, and let us pick!',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#3a7b8f',
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'GrumbleJumble',
    url: 'https://grumblejumble.com',
    description: 'A modern, minimalistic tool to solve dining and beverage indecisiveness.',
    applicationCategory: 'Food & Drink',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preload" href="/fonts/ClarityCity-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/ClarityCity-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/PlaywriteAR-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#0b131b] text-slate-100 antialiased selection:bg-brand-secondary selection:text-slate-900">
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
