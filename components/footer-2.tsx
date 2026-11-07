import Link from "next/link"
import { MapPin, Mail, Clock } from "lucide-react"
import { TextLogo } from "@/components/text-logo"
import { ReplayIntroButton } from "@/components/home/cinematic-intro"

export default function Footer() {
  const navLinks = [
    { href: "/", label: "Overview" },
    { href: "/development", label: "Master Plan 2045" },
    { href: "/progress", label: "Civic Tracker" },
    { href: "/scholarships", label: "Scholarship Directory" },
    { href: "/future-labs", label: "Future Labs & STEM" },
    { href: "/about", label: "Governance & Disclosures" },
    { href: "/contact", label: "Constituency Desk" },
  ]

  const statutoryLinks = [
    { href: "https://www.tpmanipur.mn.gov.in", label: "Manipur Town Planning Department" },
    { href: "https://amrut.gov.in", label: "AMRUT 2.0 GIS Master Plan" },
    { href: "https://lgdirectory.gov.in", label: "Local Government Directory (LGD 250326)" },
    { href: "https://scholarships.gov.in", label: "National Scholarship Portal (NSP)" },
    { href: "https://aim.gov.in/atl", label: "Atal Innovation Mission (ATL)" },
    { href: "https://necouncil.gov.in", label: "North Eastern Council (NEC)" },
  ]

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-border/60">
          {/* Office of the Representative with Mayang Imphal Logo */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              className="inline-flex group focus-visible:outline-2 focus-visible:outline-offset-2"
              aria-label="Mayang Imphal Home · Dr. Khumujam Ratankumar Singh, For the People"
            >
              <TextLogo size="lg" />
            </Link>

            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              Civic leadership and public accountability platform for Mayang Imphal (Assembly Constituency AC-23 &amp; Municipal Area LGD 250326), Manipur.
            </p>

            <div className="pt-2 space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="size-3.5 text-secondary shrink-0" />
                <span>Constituency Office: Central Bazaar Corridor, Mayang Imphal</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-3.5 text-secondary shrink-0" />
                <span>Open Grievance Hours: Every Saturday 08:30 AM to 12:30 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-3.5 text-secondary shrink-0" />
                <span>desk@bettermayangimphal.org</span>
              </div>
            </div>
          </div>

          {/* Quick Platform Navigation */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-semibold text-foreground block">
              Civic Platform
            </span>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors inline-block py-1 text-xs"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Statutory References */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-semibold text-foreground block">
              Statutory Gateways &amp; Transparency
            </span>
            <ul className="space-y-2 text-xs">
              {statutoryLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors inline-block py-1 text-xs"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <span className="inline-block border border-border/80 bg-muted/30 px-3 py-1 text-[11px] text-muted-foreground">
                DPDP Act 2023 Compliant
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Dignified Copyright & Disclosures */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-muted-foreground">
          <p>
            &copy; 2026 Mayang Imphal Civic Platform. Published for citizen transparency.
          </p>
          <div className="flex items-center gap-4">
            <ReplayIntroButton className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-ui uppercase tracking-wider font-medium text-muted-foreground hover:text-foreground border border-border/70 hover:border-border transition-colors cursor-pointer" />
            <p>
              Class-III Town Delineation, AMRUT 2.0 GIS Horizon 2045
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
