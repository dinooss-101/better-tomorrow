import type { Metadata, Viewport } from "next"
import { Oswald, Montserrat, Public_Sans, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { DensityProvider } from "@/components/density-provider"
import { cn } from "@/lib/utils"

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  style: ["normal", "italic"],
  display: "swap",
})

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL("https://mayangimphal.org"),
  title: {
    default: "Mayang Imphal · Civic Leadership Platform",
    template: "%s | Mayang Imphal",
  },
  description:
    "Civic leadership and public accountability platform for Mayang Imphal (Assembly Constituency AC-23 & Municipal Area LGD 250326), Manipur.",
  keywords: [
    "Mayang Imphal",
    "Manipur",
    "Civic Leadership",
    "AC-23",
    "LGD 250326",
    "Master Plan 2045",
    "AMRUT 2.0",
    "Future Labs",
    "Dr. Khumujam Ratankumar Singh",
    "Public Accountability",
  ],
  authors: [{ name: "Mayang Imphal Civic Platform" }],
  openGraph: {
    title: "Mayang Imphal · Civic Leadership Platform",
    description:
      "Civic leadership and public accountability platform for Mayang Imphal (Assembly Constituency AC-23 & Municipal Area LGD 250326), Manipur.",
    siteName: "Mayang Imphal",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/image/og-mayang-imphal.png",
        width: 1254,
        height: 1254,
        alt: "Mayang Imphal Civic Leadership Platform · AC-23",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mayang Imphal · Civic Leadership Platform",
    description:
      "Civic leadership and public accountability platform for Mayang Imphal (AC-23), Manipur.",
    images: ["/image/og-mayang-imphal.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "GovernmentOrganization",
      "@id": "https://mayangimphal.org/#organization",
      name: "Mayang Imphal Civic Leadership Platform",
      alternateName: "Mayang Imphal AC-23",
      url: "https://mayangimphal.org",
      logo: "https://mayangimphal.org/image/logo-bmi.png",
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Mayang Imphal",
        identifier: "LGD 250326",
        containedInPlace: {
          "@type": "State",
          name: "Manipur",
        },
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Constituency Grievance Desk",
        email: "desk@bettermayangimphal.org",
        availableLanguage: ["Manipuri", "English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://mayangimphal.org/#website",
      url: "https://mayangimphal.org",
      name: "Mayang Imphal",
      description:
        "Civic leadership and public accountability platform for Mayang Imphal (AC-23), Manipur.",
      publisher: {
        "@id": "https://mayangimphal.org/#organization",
      },
      inLanguage: "en-IN",
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        oswald.variable,
        montserrat.variable,
        publicSans.variable,
        fontMono.variable
      )}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* Public Sans becomes the default sans-serif for the entire app */}
      <body className="bg-background font-sans text-[15px] leading-relaxed text-foreground antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem('bmi_intro_seen')==='true'){document.documentElement.classList.add('bmi-intro-seen');}}catch(e){}`,
          }}
        />
        <ThemeProvider>
          <DensityProvider>{children}</DensityProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
