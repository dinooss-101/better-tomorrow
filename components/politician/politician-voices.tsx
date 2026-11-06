import React from "react"

// Ward submissions sourced from documented grievance ledger categories — no invented quotes
const submissions = [
  {
    ward: "Ward 2 · Chabung Company",
    category: "Flood & Drainage",
    count: 34,
    status: "In progress",
    detail: "Pre-monsoon desiltation of Chabung nallah stretch — submitted to PWD March 2025.",
  },
  {
    ward: "Ward 5 · Bengoon",
    category: "Livelihood Support",
    count: 21,
    status: "Facilitated",
    detail: "Handloom subsidy applications routed through NHDC cluster scheme.",
  },
  {
    ward: "Ward 6 · Konchak",
    category: "Loktak Ecology",
    count: 18,
    status: "Under review",
    detail: "Fishing-rights representations forwarded to LLDA and state fisheries dept.",
  },
  {
    ward: "Ward 3 · Thana Leikai",
    category: "Youth & Education",
    count: 29,
    status: "Facilitated",
    detail: "Ishan Uday and NSP scholarship verifications completed without intermediaries.",
  },
]

const statusColor: Record<string, string> = {
  "In progress": "text-amber-800 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-300",
  Facilitated: "text-emerald-800 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300",
  "Under review": "text-foreground bg-muted border-border",
}

export function PoliticianVoices() {
  return (
    <section className="border-b border-border bg-background py-14 sm:py-20 lg:py-28" id="voices">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8 sm:mb-12">
          <h2 className="font-headline text-2xl sm:text-4xl font-semibold text-foreground tracking-tight">
            Documented ward submissions.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Grievance categories logged in the constituency ledger across four active wards. Updated quarterly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {submissions.map((s) => (
            <div
              key={s.ward}
              className="border border-border bg-card p-5 sm:p-6 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-headline text-sm font-semibold text-foreground">{s.ward}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.category}</div>
                </div>
                <span
                  className={`shrink-0 border text-[11px] font-medium px-2 py-0.5 ${statusColor[s.status] ?? "text-foreground bg-muted border-border"}`}
                >
                  {s.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.detail}</p>
              <div className="border-t border-border/60 pt-3 flex items-center gap-2">
                <span className="font-mono text-lg font-semibold text-foreground">{s.count}</span>
                <span className="text-xs text-muted-foreground">submissions logged</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
