"use client"

import React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

export default function FAQs() {
  const faqItems = [
    {
      id: "item-1",
      question: "What is the timeline for the Mayang Imphal Master Plan 2045?",
      answer:
        "The Manipur Town Planning Department is formulating a GIS-based master plan under AMRUT 2.0 covering ~70 sq km with a 2045 horizon. Our platform audits the procurement and public consultation milestones before the master plan is formally gazetted.",
    },
    {
      id: "item-2",
      question: "How does the decoupled progress tracker work?",
      answer:
        "We track two separate metrics for every public work: Statutory Milestone (formal administrative stage) and Ground Reality (actual physical status on the site). If a project is nominally awarded but physically stalled, it is flagged Delayed on our portal.",
    },
    {
      id: "item-3",
      question: "How can students receive verified scholarship guidance?",
      answer:
        "We maintain a direct gateway to the National Scholarship Portal (NSP) for Ishan Uday and NEC Merit schemes. In compliance with the DPDP Act 2025, we never collect Aadhaar numbers, family documents, or banking passwords.",
    },
    {
      id: "item-4",
      question: "How do I attend weekly open office hours?",
      answer:
        "Open door constituent hearings are held every Saturday from 08:30 AM to 12:30 PM at the central constituency office without appointment or gatekeepers. Urgent ward issues can also be logged anytime through our Direct Constituent Desk.",
    },
  ]

  return (
    <section className="border-b border-border bg-background py-14 sm:py-20 lg:py-28" id="faqs">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <h2 className="font-headline text-2xl sm:text-4xl font-semibold text-foreground tracking-tight">
              Constituency inquiries.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed mb-6">
              Straightforward answers about our civic mandate, urban planning, and open office hours in Mayang Imphal.
            </p>
            <div className="border border-border bg-card p-4 sm:p-5">
              <span className="text-xs font-semibold text-foreground block mb-1">
                Have a specific question?
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                Write directly to our constituency desk.
              </p>
              <Link
                href="#constituent-desk"
                className="text-xs font-semibold text-secondary hover:underline"
              >
                Contact the constituent desk
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Accordion className="w-full space-y-3">
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border border-border bg-card px-4 sm:px-5 py-1"
                >
                  <AccordionTrigger className="cursor-pointer text-left font-headline text-sm sm:text-base font-medium text-foreground hover:no-underline py-3.5 min-h-11">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-4">
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
