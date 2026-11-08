"use client"

import React, { useState, useMemo } from "react"
import { useAuth } from "@/lib/auth/auth-context"
import { GrievanceStatus, GrievanceCategory, GrievancePriority } from "@/lib/types/dashboard"
import { WardNumber } from "@/lib/types/auth"
import { WARD_OPTIONS } from "@/lib/data/mock-user-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import {
  Plus,
  Search,
  CheckCircle2,
  MapPin,
  RotateCcw,
  X,
  AlertCircle,
  FileCheck,
} from "lucide-react"

export function GrievancesView() {
  const { user, role, grievances, addGrievance, updateGrievanceStatus } = useAuth()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedWard, setSelectedWard] = useState<string>("ALL")
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL")
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL")

  // New Grievance Modal / Form State
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newWard, setNewWard] = useState<WardNumber>(user?.ward || 5)
  const [newLocality, setNewLocality] = useState("")
  const [newCategory, setNewCategory] = useState<GrievanceCategory>("WATER_AND_DRAINAGE")
  const [newPriority, setNewPriority] = useState<GrievancePriority>("URGENT")
  const [newDescription, setNewDescription] = useState("")

  // Status editing modal / state
  const [editingTicketId, setEditingTicketId] = useState<string | null>(null)
  const [editStatus, setEditStatus] = useState<GrievanceStatus>("FIELD_VERIFIED")
  const [editNotes, setEditNotes] = useState("")

  const filteredTickets = useMemo(() => {
    return grievances.filter((ticket) => {
      if (selectedWard !== "ALL" && ticket.ward !== Number(selectedWard)) {
        return false
      }
      if (selectedStatus !== "ALL" && ticket.status !== selectedStatus) {
        return false
      }
      if (selectedCategory !== "ALL" && ticket.category !== selectedCategory) {
        return false
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchesTitle = ticket.title.toLowerCase().includes(q)
        const matchesLocality = ticket.locality.toLowerCase().includes(q)
        const matchesDesc = ticket.description.toLowerCase().includes(q)
        const matchesId = ticket.id.toLowerCase().includes(q)
        if (!matchesTitle && !matchesLocality && !matchesDesc && !matchesId) return false
      }
      return true
    })
  }, [grievances, selectedWard, selectedStatus, selectedCategory, searchQuery])

  const handleCreateGrievance = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || !newDescription.trim() || !newLocality.trim()) return

    addGrievance({
      citizenId: user?.id || "usr_anonymous",
      citizenName: user?.name || "Constituency Resident",
      citizenContact: user?.phone || "+91 98620 XXXXX",
      ward: newWard,
      locality: newLocality,
      title: newTitle,
      description: newDescription,
      category: newCategory,
      priority: newPriority,
      status: "PROPOSED",
    })

    setNewTitle("")
    setNewLocality("")
    setNewDescription("")
    setShowAddForm(false)
  }

  const handleSaveStatus = (id: string) => {
    updateGrievanceStatus(id, editStatus, editNotes.trim() || undefined)
    setEditingTicketId(null)
    setEditNotes("")
  }

  const statusVariantMap: Record<GrievanceStatus, "default" | "secondary" | "outline" | "destructive"> = {
    PROPOSED: "outline",
    UNDER_REVIEW: "secondary",
    FIELD_VERIFIED: "default",
    DISPATCHED_TO_MUNICIPALITY: "secondary",
    RESOLVED: "default",
  }

  const priorityVariantMap: Record<GrievancePriority, "default" | "secondary" | "outline" | "destructive"> = {
    ROUTINE: "outline",
    URGENT: "secondary",
    CRITICAL: "destructive",
  }

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-6 sm:pb-7">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-ui text-primary font-bold uppercase tracking-wider mb-1">
            <span>Mayang Imphal AC-23</span>
            <span>·</span>
            <span>Ward Casework Ledger</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground">
            Ward Priority &amp; Grievance Ledger
          </h1>
          <p className="font-sans text-xs sm:text-sm text-muted-foreground mt-1.5 max-w-xl leading-relaxed">
            Verifiable record of community drainage bottlenecks, unpaved school connectivity, and street lighting audits across Wards 1 through 12.
          </p>
        </div>

        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="rounded-none h-10 px-4 text-xs font-ui font-semibold uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 shrink-0 shadow-xs"
        >
          {showAddForm ? <X className="size-3.5" /> : <Plus className="size-3.5" />}
          <span>{showAddForm ? "Cancel Form" : "Log Ward Priority"}</span>
        </Button>
      </div>

      {/* Add New Grievance Inline Card Form */}
      {showAddForm && (
        <Card className="rounded-none border-border/80 bg-card p-0 shadow-xs">
          <CardHeader className="p-5 sm:p-6 border-b border-border/70 pb-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-display text-base sm:text-lg font-bold uppercase tracking-tight text-foreground">
                Submit Constituency Priority Issue
              </CardTitle>
              <span className="font-ui text-xs text-muted-foreground">Logging as: {user?.name}</span>
            </div>
            <Badge variant="outline" className="rounded-none text-[10px] font-ui uppercase font-semibold">
              Casework Intake
            </Badge>
          </CardHeader>

          <CardContent className="p-5 sm:p-6 pt-5">
            <form onSubmit={handleCreateGrievance} className="space-y-5">
              <FieldGroup className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Field className="sm:col-span-2">
                    <FieldLabel className="text-[11px] font-ui uppercase tracking-wider font-semibold text-foreground">
                      Issue Summary / Title *
                    </FieldLabel>
                    <Input
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Silt blockage at Bazar primary drainage outfall"
                      className="rounded-none text-xs sm:text-sm h-10"
                    />
                  </Field>

                  <Field>
                    <FieldLabel className="text-[11px] font-ui uppercase tracking-wider font-semibold text-foreground">
                      Ward Number *
                    </FieldLabel>
                    <select
                      value={newWard}
                      onChange={(e) => setNewWard(Number(e.target.value) as WardNumber)}
                      className="w-full h-10 border border-input bg-background px-3 text-xs sm:text-sm rounded-none font-sans text-foreground"
                    >
                      {WARD_OPTIONS.map((opt) => (
                        <option key={opt.ward} value={opt.ward}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Field>
                    <FieldLabel className="text-[11px] font-ui uppercase tracking-wider font-semibold text-foreground">
                      Specific Locality / Landmark *
                    </FieldLabel>
                    <Input
                      required
                      value={newLocality}
                      onChange={(e) => setNewLocality(e.target.value)}
                      placeholder="e.g. Near Heituppokpi Community Hall"
                      className="rounded-none text-xs sm:text-sm h-10"
                    />
                  </Field>

                  <Field>
                    <FieldLabel className="text-[11px] font-ui uppercase tracking-wider font-semibold text-foreground">
                      Category
                    </FieldLabel>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as GrievanceCategory)}
                      className="w-full h-10 border border-input bg-background px-3 text-xs sm:text-sm rounded-none font-sans text-foreground"
                    >
                      <option value="WATER_AND_DRAINAGE">Water &amp; Drainage</option>
                      <option value="ROAD_CONNECTIVITY">Roads &amp; Connectivity</option>
                      <option value="MUNICIPAL_SERVICES">Municipal Services</option>
                      <option value="EDUCATION_STEM">Education &amp; STEM</option>
                    </select>
                  </Field>

                  <Field>
                    <FieldLabel className="text-[11px] font-ui uppercase tracking-wider font-semibold text-foreground">
                      Urgency Priority
                    </FieldLabel>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value as GrievancePriority)}
                      className="w-full h-10 border border-input bg-background px-3 text-xs sm:text-sm rounded-none font-sans text-foreground"
                    >
                      <option value="ROUTINE">Routine Maintenance</option>
                      <option value="URGENT">Urgent (Before Rains)</option>
                      <option value="CRITICAL">Critical Emergency</option>
                    </select>
                  </Field>
                </div>

                <Field>
                  <FieldLabel className="text-[11px] font-ui uppercase tracking-wider font-semibold text-foreground">
                    Detailed Description &amp; Ground Evidence *
                  </FieldLabel>
                  <textarea
                    required
                    rows={4}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Describe the physical condition, number of households affected, or specific impediment..."
                    className="w-full border border-input bg-background p-3 text-xs sm:text-sm rounded-none font-sans text-foreground focus-visible:outline-2 focus-visible:outline-primary leading-relaxed"
                  />
                </Field>
              </FieldGroup>

              <div className="flex justify-end gap-3 pt-3 border-t border-border/60">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  className="rounded-none text-xs h-9 px-4 font-ui uppercase"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-none text-xs h-9 px-4 font-ui uppercase font-semibold bg-primary text-primary-foreground"
                >
                  Submit to Ward Desk
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Filter & Search Bar Composed with Card */}
      <Card className="rounded-none border-border/80 bg-card p-4 sm:p-5 shadow-xs space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Search Input */}
          <div className="relative">
            <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search issues, localities, IDs..."
              className="pl-9 h-10 rounded-none text-xs sm:text-sm"
            />
          </div>

          {/* Ward Filter */}
          <div>
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="w-full h-10 border border-input bg-background px-3 text-xs sm:text-sm rounded-none font-sans text-foreground"
            >
              <option value="ALL">All 12 Wards</option>
              {WARD_OPTIONS.map((opt) => (
                <option key={opt.ward} value={String(opt.ward)}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full h-10 border border-input bg-background px-3 text-xs sm:text-sm rounded-none font-sans text-foreground"
            >
              <option value="ALL">All Stages</option>
              <option value="PROPOSED">Proposed</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="FIELD_VERIFIED">Field Verified</option>
              <option value="DISPATCHED_TO_MUNICIPALITY">Dispatched to Municipality</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-9 border border-input bg-background px-2.5 text-xs rounded-none font-sans text-foreground"
            >
              <option value="ALL">All Categories</option>
              <option value="WATER_AND_DRAINAGE">Water &amp; Drainage</option>
              <option value="ROAD_CONNECTIVITY">Roads &amp; Connectivity</option>
              <option value="MUNICIPAL_SERVICES">Municipal Services</option>
              <option value="EDUCATION_STEM">Education &amp; STEM</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-muted-foreground font-ui pt-0.5">
          <div className="flex items-center gap-2">
            <span>Showing {filteredTickets.length} of {grievances.length} constituency records</span>
            <Badge variant="outline" className="rounded-none text-[9px] font-ui uppercase font-semibold h-4 px-1">
              Active Docket
            </Badge>
          </div>
          {(searchQuery || selectedWard !== "ALL" || selectedStatus !== "ALL" || selectedCategory !== "ALL") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("")
                setSelectedWard("ALL")
                setSelectedStatus("ALL")
                setSelectedCategory("ALL")
              }}
              className="text-primary hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="size-3" /> Reset Filters
            </button>
          )}
        </div>
      </Card>

      {/* Empty State */}
      {filteredTickets.length === 0 && (
        <Alert className="rounded-none border-border/70 bg-card p-6 text-center flex flex-col items-center justify-center gap-2">
          <AlertCircle className="size-6 text-muted-foreground" />
          <AlertTitle className="text-sm font-semibold text-foreground">
            No matching constituency records found
          </AlertTitle>
          <AlertDescription className="text-xs text-muted-foreground max-w-sm">
            Try adjusting your search query, selecting &ldquo;All 12 Wards&rdquo;, or resetting your status filter.
          </AlertDescription>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery("")
              setSelectedWard("ALL")
              setSelectedStatus("ALL")
              setSelectedCategory("ALL")
            }}
            className="rounded-none text-xs h-7.5 px-3 font-ui uppercase mt-1"
          >
            Clear Filters
          </Button>
        </Alert>
      )}

      {/* Grievance Ledger Items Composed with Card & Badge */}
      <div className="space-y-4 sm:space-y-5">
        {filteredTickets.map((ticket) => {
          const isEditing = editingTicketId === ticket.id
          const canManage = role === "ward_coordinator" || role === "desk_admin"

          const initials = ticket.citizenName
            ? ticket.citizenName
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")
            : `W${ticket.ward}`

          return (
            <Card
              key={ticket.id}
              className="rounded-none border-border/80 bg-card p-5 sm:p-6 shadow-xs transition-colors hover:border-primary/40 space-y-3.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <Avatar className="size-9 rounded-none border border-border/70 shrink-0 mt-0.5">
                    <AvatarFallback className="rounded-none bg-muted font-ui text-[11px] font-bold text-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-xs font-bold text-foreground">
                        {ticket.id}
                      </span>
                      <span className="text-muted-foreground">·</span>
                      <Badge
                        variant="outline"
                        className="rounded-none text-[9px] font-ui uppercase font-semibold h-4 px-1.5 flex items-center gap-1"
                      >
                        <MapPin className="size-2.5 text-primary" />
                        Ward {ticket.ward} ({ticket.locality})
                      </Badge>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-[11px] font-sans text-muted-foreground">
                        Logged {new Date(ticket.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>

                    <h3 className="font-sans font-semibold text-sm sm:text-base text-foreground leading-snug">
                      {ticket.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto pt-1 sm:pt-0">
                  <Badge
                    variant={priorityVariantMap[ticket.priority] || "outline"}
                    className="rounded-none text-[9px] font-ui uppercase font-semibold tracking-wider px-2 py-0.5"
                  >
                    {ticket.priority}
                  </Badge>

                  <Badge
                    variant={statusVariantMap[ticket.status] || "outline"}
                    className="rounded-none text-[9px] font-ui uppercase font-semibold tracking-wider px-2.5 py-0.5"
                  >
                    {ticket.status.replace(/_/g, " ")}
                  </Badge>

                  {canManage && !isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingTicketId(ticket.id)
                        setEditStatus(ticket.status)
                        setEditNotes(ticket.fieldVerificationNotes || "")
                      }}
                      className="h-6.5 text-[10px] px-2.5 font-ui uppercase rounded-none border-dashed"
                    >
                      Audit
                    </Button>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed pl-12">
                {ticket.description}
              </p>

              {/* Status Updater Panel for Coordinators/Admin */}
              {isEditing && (
                <div className="border-t border-border/70 pt-2.5 mt-2.5 p-3 bg-muted/20 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-ui font-bold uppercase text-primary">
                    <span className="flex items-center gap-1.5">
                      <FileCheck className="size-3.5" />
                      Field Verification &amp; Status Update
                    </span>
                    <button
                      type="button"
                      onClick={() => setEditingTicketId(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-ui uppercase text-muted-foreground mb-1">
                        Update Status
                      </label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value as GrievanceStatus)}
                        className="w-full h-8.5 border border-input bg-background px-2 text-xs rounded-none font-sans"
                      >
                        <option value="PROPOSED">PROPOSED</option>
                        <option value="UNDER_REVIEW">UNDER REVIEW</option>
                        <option value="FIELD_VERIFIED">FIELD VERIFIED</option>
                        <option value="DISPATCHED_TO_MUNICIPALITY">DISPATCHED TO MUNICIPALITY</option>
                        <option value="RESOLVED">RESOLVED</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-ui uppercase text-muted-foreground mb-1">
                        Inspector Notes
                      </label>
                      <Input
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        placeholder="e.g. Inspected site. Verified 40cm silt blockage..."
                        className="h-8.5 rounded-none text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingTicketId(null)}
                      className="h-7.5 px-2.5 text-[10px] font-ui uppercase rounded-none"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleSaveStatus(ticket.id)}
                      className="h-7.5 px-2.5 text-[10px] font-ui uppercase font-semibold bg-primary text-primary-foreground rounded-none"
                    >
                      Save Status
                    </Button>
                  </div>
                </div>
              )}

              {/* Field Notes & Dispatch Reference Footer */}
              <div className="border-t border-border/60 pt-2 flex flex-wrap items-center justify-between gap-2 text-[10px] font-sans text-muted-foreground pl-10.5">
                <div className="flex items-center gap-3">
                  {ticket.assignedCoordinator && (
                    <span>Assigned: <strong>{ticket.assignedCoordinator}</strong></span>
                  )}
                  {ticket.officialDispatchReference && (
                    <span>Dispatch Ref: <code className="font-mono">{ticket.officialDispatchReference}</code></span>
                  )}
                </div>

                {ticket.fieldVerificationNotes && !isEditing && (
                  <div className="text-foreground/90 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="size-3 text-primary" />
                    <span>{ticket.fieldVerificationNotes}</span>
                  </div>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
