import { Inter, Merriweather } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-serif",
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Dr. Marwah Al-Helali | AI Researcher & Deep Learning Expert",
    template: "%s | Dr. Marwah Al-Helali"
  },
  description: "Dr. Marwah Al-Helali - PhD Researcher in Artificial Intelligence and Deep Learning. Specializing in machine learning, predictive modeling, and intelligent systems. Published researcher in AI and medical imaging.",
  keywords: [
    "Marwah Al-Helali",
    "Dr. Marwah Al-Helali",
    "AI Researcher",
    "Deep Learning",
    "Machine Learning",
    "PhD Researcher",
    "Artificial Intelligence",
    "Medical Imaging",
    "Computer Science",
    "Research Publications",
    "Marwah",
    "Al-Helali"
  ],
  authors: [{ name: "Dr. Marwah Al-Helali" }],
  creator: "Dr. Marwah Al-Helali",
  publisher: "Dr. Marwah Al-Helali",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.marwahalhelali.online',
    siteName: 'Dr. Marwah Al-Helali Portfolio',
    title: 'Dr. Marwah Al-Helali | AI Researcher & Deep Learning Expert',
    description: 'PhD Researcher in Artificial Intelligence and Deep Learning, specializing in machine learning and intelligent systems.',
    images: [
      {
        url: 'https://www.marwahalhelali.online/uploads/profile.jpeg',
        width: 1200,
        height: 630,
        alt: 'Dr. Marwah Al-Helali',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Marwah Al-Helali | AI Researcher',
    description: 'PhD Researcher in AI and Deep Learning',
    images: ['https://www.marwahalhelali.online/uploads/profile.jpeg'],
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google verification code
  },
};

export default function RootLayout({ children }) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Dr. Marwah Al-Helali",
    "jobTitle": "PhD Researcher",
    "description": "PhD Researcher in Artificial Intelligence and Deep Learning",
    "url": "https://www.marwahalhelali.online",
    "image": "https://www.marwahalhelali.online/uploads/profile.jpeg",
    "sameAs": [
      "https://www.linkedin.com/in/marwah-al-helali-a3bb05243/",
      "https://scholar.google.com/citations?user=hlIQz8IAAAAJ&hl=en",
      "https://orcid.org/0009-0002-3079-0106",
      "https://www.researchgate.net/profile/Marwah-Al-Helali",
      "https://github.com/MarwahZaidMohammedAl-Helali"
    ],
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Manchester Metropolitan University"
    },
    "knowsAbout": [
      "Artificial Intelligence",
      "Deep Learning",
      "Machine Learning",
      "Medical Imaging",
      "Predictive Modeling",
      "Computer Science"
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
