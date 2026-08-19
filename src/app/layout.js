import "./globals.css";
import Providers from "../components/Providers";
import LayoutShell from "../components/LayoutShell";
import { Open_Sans, Plus_Jakarta_Sans, Poiret_One } from 'next/font/google';
import { getLocations } from "../utils/locations";

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
});

const poiretOne = Poiret_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poiret-one',
});

export const metadata = {
  title: "Shiksha - Master In-Demand Skills & Get Certified",
  description: "Master in-demand skills with industry-leading courses. Get certified, land your dream job, and join thousands of successful graduates.",
  icons: {
    icon: "/favicon.svg",
  }
};

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://shikshadesign.com').replace(/\/$/, '');

const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#organization`,
      "name": "Shiksha",
      "url": SITE_URL,
      "logo": `${SITE_URL}/images/shiksha-logo.webp`,
      "image": `${SITE_URL}/images/shiksha-logo.webp`,
      "description": "Master in-demand skills with industry-leading courses. Get certified, land your dream job, and join thousands of successful graduates."
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": SITE_URL,
      "name": "Shiksha",
      "publisher": {
        "@id": `${SITE_URL}/#organization`
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${SITE_URL}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

export default async function RootLayout({ children }) {
  const locations = await getLocations().catch(() => []);

  return (
    <html lang="en" className={`h-full antialiased ${openSans.variable} ${plusJakartaSans.variable} ${poiretOne.variable}`}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preload" as="image" href="/images/whatwedobg.webp" media="(min-width: 768px)" fetchPriority="high" />
        <link rel="preload" as="image" href="/images/whatwedobg-tab.webp" media="(max-width: 767px)" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col open-sans">
        <Providers>
          <LayoutShell initialLocations={locations}>
            {children}
          </LayoutShell>
        </Providers>
      </body>
    </html>
  );
}
