import './globals.css';

export const metadata = {
  metadataBase: new URL('https://grumblejumble.com'),
  title: 'GrumbleJumble | Less Thinking. More Eating.',
  description: 'Can\'t settle on a restaurant? Let us pick for you!',
  keywords: ['restaurant picker', 'random restaurant', 'food decision maker', 'where to eat', 'boba', 'coffee', 'group dining'],
  authors: [{ name: 'Ivan Huang' }, { name: 'Roy Jou' }],
  creator: 'GrumbleJumble',
  publisher: 'GrumbleJumble',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://grumblejumble.com',
    siteName: 'GrumbleJumble',
    title: 'GrumbleJumble | Less Thinking. More Eating.',
    description: 'Can\'t settle on a restaurant? Let us pick for you!',
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
    title: 'GrumbleJumble | Less Thinking. More Eating.',
    description: 'Can\'t settle on a restaurant? Let us pick for you!',
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
    description: 'Can\'t settle on a restaurant? Let us pick for you!1',
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
      <body className="min-h-[100dvh] flex flex-col bg-[#0b131b] text-slate-100 antialiased selection:bg-brand-secondary selection:text-slate-900 overflow-x-hidden">
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-0">
          {children}
        </main>
      </body>
    </html>
  );
}
