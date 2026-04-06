import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

// ── SEO Metadata ───────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://www.perfectlogistics.org'),

  title: {
    default: "Perfect Logistics | Petro-Logistics & Industrial Services India",
    template: "%s | Perfect Logistics",
  },
  description:
    "Perfect Logistics — India's trusted petro-logistics company since 2000. Specializing in HSD/MS tank cleaning, pipeline installation, PESO calibration, O&M services & warehouse management. Serving BPCL, Shell, ONGC, TCS, Airtel & more across India.",

  keywords: [
    "petro logistics India",
    "HSD tank cleaning",
    "MS tank cleaning",
    "underground tank cleaning Mangalore",
    "pipeline installation India",
    "PESO certification services",
    "O&M petrol station",
    "tank calibration services",
    "oil and gas maintenance India",
    "logistics company Mangalore",
    "industrial services Bangalore",
    "Perfect Logistics Mangalore",
    "Senthil Chettiar logistics",
    "warehouse management India",
    "BPCL shell logistics partner",
    "petrol station maintenance",
    "HSD tank installation",
    "petroleum logistics Karnataka",
    "tank cleaning company India",
    "PESO approved contractor",
  ],

  alternates: {
    canonical: 'https://www.perfectlogistics.org',
  },

  authors: [{ name: "Perfect Logistics", url: "https://www.perfectlogistics.org" }],
  creator: "Perfect Logistics",
  publisher: "Perfect Logistics",

  category: "Industrial Services",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── Verification (add your actual codes when available) ──────
  verification: {
    google: '89557c809b3377e9',
    // yandex: 'your-yandex-code',
  },

  // ── Open Graph ────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.perfectlogistics.org",
    siteName: "Perfect Logistics",
    title: "Perfect Logistics | Petro-Logistics & Industrial Services India",
    description:
      "India's trusted petro-logistics company since 2000. HSD/MS tank cleaning, pipeline installation, PESO calibration, O&M services & warehouse management across India.",
    images: [
      {
        url: "https://www.perfectlogistics.org/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Perfect Logistics - Petro Logistics Solutions India",
        type: "image/jpeg",
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@perfectlogistics",
    title: "Perfect Logistics | Petro-Logistics & Industrial Services India",
    description:
      "India's trusted petro-logistics company since 2000. Tank cleaning, pipeline installation, PESO calibration & O&M services across India.",
    images: [
      {
        url: "https://www.perfectlogistics.org/og-image.jpg",
        alt: "Perfect Logistics - Petro Logistics Solutions India",
      }
    ],
  },
};

// ── Structured Data (JSON-LD) ──────────────────────────────────
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.perfectlogistics.org/#organization",
  name: "Perfect Logistics",
  legalName: "Perfect Logistics",
  description:
    "Perfect Logistics is India's trusted petro-logistics and industrial services provider — specializing in HSD/MS tank cleaning, pipeline installation, PESO calibration, O&M services, and warehouse management.",
  url: "https://www.perfectlogistics.org",
  logo: {
    "@type": "ImageObject",
    url: "https://www.perfectlogistics.org/logo.png",
    width: 200,
    height: 200,
  },
  image: "https://www.perfectlogistics.org/og-image.jpg",
  telephone: ["+91-99000-48837", "+91-94820-48837", "+91-824-240-9905"],
  faxNumber: "+91-824-245-0902",
  email: "info@perfectlogistics.in",
  foundingDate: "2000",
  founder: {
    "@type": "Person",
    name: "Ln. Senthil K. Chettiar",
    jobTitle: "Founder & Managing Director",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "1st Floor, Vishnukripa Building, NH 17, Opp. Syndicate Bank, Kulai",
    addressLocality: "Mangalore",
    addressRegion: "Karnataka",
    postalCode: "575010",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 12.9141,
    longitude: 74.856,
  },
  hasMap: "https://maps.google.com/?q=12.9141,74.856",
  areaServed: [
    { "@type": "City", name: "Mangalore" },
    { "@type": "City", name: "Bangalore" },
    { "@type": "City", name: "Chennai" },
    { "@type": "City", name: "Hyderabad" },
    { "@type": "City", name: "Delhi" },
    { "@type": "City", name: "Ernakulam" },
    { "@type": "City", name: "Coimbatore" },
    { "@type": "Country", name: "India" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Petro Logistics Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "HSD Tank Cleaning" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "MS Tank Cleaning" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Underground Tank Cleaning" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pipeline Installation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "PESO Calibration" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "O&M Petrol Station" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Warehouse Management" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Industrial Maintenance" } },
    ],
  },
  sameAs: [
    "https://www.perfectlogistics.org",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "14:00",
    },
  ],
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, Bank Transfer, Cheque",
  priceRange: "₹₹",
};

// ── Root Layout ────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon set */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#1d4ed8" />

        {/* Geo tags for local SEO */}
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Mangalore, Karnataka, India" />
        <meta name="geo.position" content="12.9141;74.856" />
        <meta name="ICBM" content="12.9141, 74.856" />
      </head>
      <body suppressHydrationWarning className="bg-secondary text-dark">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}