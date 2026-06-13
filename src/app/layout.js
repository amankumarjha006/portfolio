import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aman Kumar Jha | AI/ML Engineer & Full Stack Developer",
  description: "B.Tech CSE (AI/ML) student building AI-powered products, recommendation systems, Retrieval-Augmented Generation applications, and modern full-stack web experiences.",
  keywords: [
    "Aman Kumar Jha",
    "AI Engineer",
    "Machine Learning",
    "Full Stack Developer",
    "Next.js",
    "React",
    "Python",
    "FastAPI",
    "RAG",
    "Recommendation Systems",
    "Software Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Aman Kumar Jha" }],
  creator: "Aman Kumar Jha",
  openGraph: {
    title: "Aman Kumar Jha | AI/ML Engineer & Full Stack Developer",
    description: "Building AI-powered products, recommendation systems, and scalable full-stack applications.",
    url: "https://your-domain.com", // Replace with actual domain
    siteName: "Aman Kumar Jha Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aman Kumar Jha | AI/ML Engineer & Full Stack Developer",
    description: "Building AI-powered products, recommendation systems, and scalable full-stack applications.",
  },
  alternates: {
    canonical: "https://your-domain.com", // Replace with actual domain
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aman Kumar Jha",
    jobTitle: "AI/ML Engineer",
    url: "https://your-domain.com",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "SDGI Global University",
    },
    sameAs: [
      "https://github.com/amankumarjha006",
      "https://www.linkedin.com/in/aman-kumar-jha-615274323",
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
