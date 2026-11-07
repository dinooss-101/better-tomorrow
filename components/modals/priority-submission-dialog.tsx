"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldDescription, FieldGroup } from "@/components/ui/field"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, ShieldAlert } from "lucide-react"

interface PrioritySubmissionDialogProps {
  children?: React.ReactElement
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function PrioritySubmissionDialog({
  children,
  open: externalOpen,
  onOpenChange: setExternalOpen,
}: PrioritySubmissionDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = externalOpen !== undefined
  const isOpen = isControlled ? externalOpen : internalOpen
  const setIsOpen = isControlled ? setExternalOpen! : setInternalOpen

  const [submitted, setSubmitted] = useState(false)
  const [category, setCategory] = useState("WATER_DRAINAGE")
  const [locality, setLocality] = useState("")
  const [description, setDescription] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [contactEmail, setContactEmail] = useState("")
  const [dpdpConsent, setDpdpConsent] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!locality.trim()) {
      setErrorMessage("Please specify the locality, landmark, or municipal ward.")
      return
    }
    if (!description.trim() || description.length < 15) {
      setErrorMessage("Please describe the issue or suggestion with sufficient detail (at least 15 characters).")
      return
    }
    if (!dpdpConsent) {
      setErrorMessage("You must acknowledge the privacy & DPDP compliance notice.")
      return
    }

    // shortcut: client-side mock submission only, connect to Supabase/PostgreSQL after frontend review
    setErrorMessage("")
    setSubmitted(true)
  }

  const handleReset = () => {
    setSubmitted(false)
    setLocality("")
    setDescription("")
    setContactEmail("")
    setDpdpConsent(false)
    setErrorMessage("")
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children && <DialogTrigger render={children} />}
      <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="rounded-none border-secondary/30 text-secondary text-xs font-ui font-semibold uppercase tracking-wider">
              Demonstration Preview Mode
            </Badge>
          </div>
          <DialogTitle className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-foreground">
            Share a Local Priority
          </DialogTitle>
          <DialogDescription className="text-xs leading-relaxed text-muted-foreground">
            Contribute local knowledge on drainage, school connectivity, public facilities, or community needs.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col gap-4 py-6 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <CheckCircle2 className="size-6" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Demonstration Intake Validated</h3>
            <p className="text-sm text-muted-foreground">
              In this preview milestone, the form inputs pass client-side data validation. In Phase 4, submissions
              will securely persist to an encrypted PostgreSQL database protected by Row Level Security (RLS).
            </p>
            <div className="rounded-none border border-border/80 bg-muted/40 p-3 text-left text-xs text-muted-foreground">
              <div className="font-medium text-foreground">Preview Record Summary:</div>
              <div>Category: {category}</div>
              <div>Locality: {locality}</div>
              <div>Anonymity: {isAnonymous ? "Anonymous Submission" : contactEmail}</div>
            </div>
            <Button onClick={handleReset} className="mx-auto mt-2 w-fit">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-2">
            <div className="rounded-none border border-amber-500/20 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-900 dark:text-amber-200">
              <span className="font-semibold flex items-center gap-1 mb-1">
                <ShieldAlert className="size-3.5" /> Prototype Notice:
              </span>
              This form is a preview demonstration. Your information will not be transmitted or stored on a live database during this preview phase. No fake reference IDs are issued.
            </div>

            {errorMessage && (
              <div className="rounded-none border border-rose-500/20 bg-rose-500/10 p-2.5 text-xs text-rose-800 dark:text-rose-200 flex items-center gap-1.5">
                <AlertCircle className="size-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <FieldGroup className="flex flex-col gap-3">
              <Field>
                <FieldLabel htmlFor="category" className="text-xs font-semibold">Priority Category</FieldLabel>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-none border border-input bg-background px-3 py-2 text-base sm:text-sm text-foreground focus-visible:outline-ring/50"
                >
                  <option value="WATER_DRAINAGE">Water Management, Canals & Drainage</option>
                  <option value="ROADS_CONNECTIVITY">Road Connectivity & School Access</option>
                  <option value="MUNICIPAL_SERVICES">Municipal Services, Waste & Public Spaces</option>
                  <option value="EDUCATION_YOUTH">Education, STEM & Youth Opportunities</option>
                  <option value="MARKETS_AGRICULTURE">Local Markets & Agricultural Infrastructure</option>
                  <option value="OTHER">Other Community Issue</option>
                </select>
              </Field>

              <Field>
                <FieldLabel htmlFor="locality" className="text-xs font-semibold">Locality / Ward Reference</FieldLabel>
                <Input
                  id="locality"
                  placeholder="e.g. Mayang Imphal Bazar, Ward 4 near Bridge, etc."
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="text-base sm:text-sm"
                />
                <FieldDescription className="text-[11px]">
                  Provide a general locality or municipal ward. Do not include specific private household addresses.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="description" className="text-xs font-semibold">Detailed Description & Suggested Action</FieldLabel>
                <Textarea
                  id="description"
                  placeholder="Describe the condition, seasonal impact, or constructive suggestion..."
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="text-base sm:text-sm"
                />
              </Field>

              <div className="flex flex-col gap-2 rounded-none border border-border/80 bg-muted/20 p-3">
                <label className="flex items-center gap-2 text-xs font-medium text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded border-input text-secondary"
                  />
                  Submit anonymously (Recommended for privacy)
                </label>

                {!isAnonymous && (
                  <Field className="pt-2">
                    <FieldLabel htmlFor="email" className="text-xs font-semibold">Contact Email (Confidential)</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="text-sm"
                    />
                    <FieldDescription className="text-[11px]">
                      Stored in a private table. Never published publicly.
                    </FieldDescription>
                  </Field>
                )}
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  id="dpdp-consent"
                  type="checkbox"
                  checked={dpdpConsent}
                  onChange={(e) => setDpdpConsent(e.target.checked)}
                  className="mt-1 rounded border-input text-secondary"
                />
                <label htmlFor="dpdp-consent" className="text-[11px] leading-relaxed text-muted-foreground cursor-pointer">
                  I understand that this platform compiles civic feedback for review and does not guarantee government funding or immediate administrative action. I consent to non-identifying data synthesis under privacy-by-design standards.
                </label>
              </div>
            </FieldGroup>

            <DialogFooter className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-border/60 pt-4">
              <span className="text-[11px] text-muted-foreground text-center sm:text-left">Demo Mode · Client-side preview</span>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsOpen(false)} className="flex-1 sm:flex-initial min-h-11 sm:min-h-0">
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="flex-1 sm:flex-initial min-h-11 sm:min-h-0 bg-primary text-primary-foreground">
                  Submit
                </Button>
              </div>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
