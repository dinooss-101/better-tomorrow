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
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, ShieldAlert, AlertCircle } from "lucide-react"

interface RegisterInterestDialogProps {
  children?: React.ReactElement
  initialProgramType?: "FUTURE_LABS" | "DIASPORA_MENTOR" | "SCHOLARSHIP_ALERT"
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function RegisterInterestDialog({
  children,
  initialProgramType = "FUTURE_LABS",
  open: externalOpen,
  onOpenChange: setExternalOpen,
}: RegisterInterestDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = externalOpen !== undefined
  const isOpen = isControlled ? externalOpen : internalOpen
  const setIsOpen = isControlled ? setExternalOpen! : setInternalOpen

  const [submitted, setSubmitted] = useState(false)
  const [programType, setProgramType] = useState(initialProgramType)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("STUDENT")
  const [isMinor, setIsMinor] = useState(false)
  const [guardianName, setGuardianName] = useState("")
  const [guardianConsent, setGuardianConsent] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim()) {
      setErrorMessage("Please enter your name.")
      return
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.")
      return
    }
    if (
      role === "STUDENT" &&
      isMinor &&
      (!guardianName.trim() || !guardianConsent)
    ) {
      setErrorMessage(
        "Applicants under 18 require parental/guardian consent and guardian name."
      )
      return
    }

    // shortcut: client-side mock submission only, connect to Supabase/PostgreSQL after frontend review
    setErrorMessage("")
    setSubmitted(true)
  }

  const handleReset = () => {
    setSubmitted(false)
    setFullName("")
    setEmail("")
    setIsMinor(false)
    setGuardianName("")
    setGuardianConsent(false)
    setErrorMessage("")
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children && <DialogTrigger render={children} />}
      <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] overflow-y-auto p-4 sm:max-w-lg sm:p-6">
        <DialogHeader className="flex flex-col gap-2">
          <Badge
            variant="outline"
            className="w-fit rounded-none border-secondary/30 text-xs font-ui font-semibold uppercase tracking-wider text-secondary"
          >
            Preview Mode · Program Interest
          </Badge>
          <DialogTitle className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-foreground">
            Register Program Interest
          </DialogTitle>
          <DialogDescription className="text-xs leading-relaxed text-muted-foreground">
            Express interest in proposed learning workshops, scholarship alerts,
            or volunteer diaspora mentoring.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col gap-4 py-6 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <CheckCircle2 className="size-6" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              Preview Interest Registered
            </h3>
            <p className="text-sm text-muted-foreground">
              Thank you. In this frontend preview, inputs pass client-side
              validation. In Phase 4, official enrollment will launch with
              verified school partners and screened mentors.
            </p>
            <Button onClick={handleReset} className="mx-auto mt-2 w-fit">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-2">
            <div className="rounded-none border border-amber-500/20 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-900 dark:text-amber-200">
              <span className="mb-1 flex items-center gap-1 font-semibold">
                <ShieldAlert className="size-3.5" /> Prototype Notice:
              </span>
              This form is a preview demonstration. Programs labeled
              &ldquo;Proposed&rdquo; (such as Future Labs &amp; Diaspora
              Mentoring) are currently in pre-pilot assessment. No personal data
              is stored to a production server during this demonstration.
            </div>

            {errorMessage && (
              <div className="flex items-center gap-1.5 rounded-none border border-rose-500/20 bg-rose-500/10 p-2.5 text-xs text-rose-800 dark:text-rose-200">
                <AlertCircle className="size-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <FieldGroup className="flex flex-col gap-3">
              <Field>
                <FieldLabel
                  htmlFor="prog-type"
                  className="text-xs font-semibold"
                >
                  Initiative
                </FieldLabel>
                <select
                  id="prog-type"
                  value={programType}
                  onChange={(e) =>
                    setProgramType(
                      e.target.value as
                        "FUTURE_LABS" | "DIASPORA_MENTOR" | "SCHOLARSHIP_ALERT"
                    )
                  }
                  className="w-full rounded-none border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-ring/50 sm:text-sm"
                >
                  <option value="FUTURE_LABS">
                    Mayang Imphal Future Labs (STEM, Robotics & Coding)
                  </option>
                  <option value="DIASPORA_MENTOR">
                    Global Mentor Circle (Diaspora Volunteer)
                  </option>
                  <option value="SCHOLARSHIP_ALERT">
                    Official Scholarship Alerts & Updates
                  </option>
                </select>
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="user-role"
                  className="text-xs font-semibold"
                >
                  I am participating as
                </FieldLabel>
                <select
                  id="user-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-none border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-ring/50 sm:text-sm"
                >
                  <option value="STUDENT">Secondary / College Student</option>
                  <option value="PARENT">Parent or Legal Guardian</option>
                  <option value="EDUCATOR">
                    Local School Teacher / Headmaster
                  </option>
                  <option value="DIASPORA_PROFESSIONAL">
                    Diaspora Professional / Researcher
                  </option>
                </select>
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="reg-name"
                  className="text-xs font-semibold"
                >
                  Full Name
                </FieldLabel>
                <Input
                  id="reg-name"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="text-base sm:text-sm"
                />
              </Field>

              <Field>
                <FieldLabel
                  htmlFor="reg-email"
                  className="text-xs font-semibold"
                >
                  Contact Email
                </FieldLabel>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-base sm:text-sm"
                />
              </Field>

              {role === "STUDENT" && (
                <div className="flex flex-col gap-2 rounded-none border border-border/80 bg-muted/20 p-3 text-xs">
                  <label className="flex cursor-pointer items-center gap-2 font-medium text-foreground">
                    <input
                      type="checkbox"
                      checked={isMinor}
                      onChange={(e) => setIsMinor(e.target.checked)}
                      className="rounded border-input text-secondary"
                    />
                    I am under 18 years of age
                  </label>

                  {isMinor && (
                    <div className="flex flex-col gap-2.5 border-t border-border/60 pt-2">
                      <Field>
                        <FieldLabel
                          htmlFor="guardian-name"
                          className="text-xs font-semibold"
                        >
                          Parent / Legal Guardian Name
                        </FieldLabel>
                        <Input
                          id="guardian-name"
                          placeholder="Parent or Guardian's full name"
                          value={guardianName}
                          onChange={(e) => setGuardianName(e.target.value)}
                          className="text-sm"
                        />
                      </Field>
                      <label className="flex cursor-pointer items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
                        <input
                          type="checkbox"
                          checked={guardianConsent}
                          onChange={(e) => setGuardianConsent(e.target.checked)}
                          className="mt-0.5 rounded border-input text-secondary"
                        />
                        Parent/Guardian confirms permission for the student to
                        register interest in upcoming supervised workshops.
                      </label>
                    </div>
                  )}
                </div>
              )}

              {programType === "DIASPORA_MENTOR" && (
                <div className="rounded-none border border-border/80 bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground">
                  <span className="mb-1 block font-semibold text-foreground">
                    Mentor Safeguarding Protocol:
                  </span>
                  All volunteer mentors must complete credential screening and
                  agree to supervised group interaction guidelines before
                  participating in student sessions.
                </div>
              )}
            </FieldGroup>

            <DialogFooter className="flex flex-col-reverse items-stretch justify-between gap-3 border-t border-border/60 pt-4 sm:flex-row sm:items-center">
              <span className="text-center text-[11px] text-muted-foreground sm:text-left">
                Preview demonstration
              </span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="min-h-11 flex-1 sm:min-h-0 sm:flex-initial"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="min-h-11 flex-1 bg-primary text-primary-foreground sm:min-h-0 sm:flex-initial"
                >
                  Register
                </Button>
              </div>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
