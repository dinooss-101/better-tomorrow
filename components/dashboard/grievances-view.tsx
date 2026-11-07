"use client"

import React, { useState, useMemo } from "react"
import { useAuth } from "@/lib/auth/auth-context"
import { GrievanceStatus, GrievanceCategory, GrievancePriority } from "@/lib/types/dashboard"
import { WardNumber } from "@/lib/types/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Plus,
  Search,
  CheckCircle2,
  MapPin,
  RotateCcw,
  X,
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

  const statusBadges = {
    PROPOSED: "bg-muted text-muted-foreground border-border",
    UNDER_REVIEW: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30",
    FIELD_VERIFIED: "bg-primary/10 text-primary dark:text-emerald-400 border-primary/30",
    DISPATCHED_TO_MUNICIPALITY: "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/30",
    RESOLVED: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-ui text-primary dark:text-emerald-400 font-bold uppercase tracking-wider mb-1">
            <span>Mayang Imphal AC-23</span>
            <span>·</span>
            <span>Ward Casework Ledger</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-foreground">
            Ward Priority &amp; Grievance Ledger
          </h1>
          <p className="font-sans text-xs sm:text-sm text-muted-foreground mt-1">
            Verifiable record of community drainage bottlenecks, unpaved school connectivity, and street lighting audits across Wards 1 through 12.
          </p>
        </div>

        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="rounded-none min-h-11 text-xs font-ui font-semibold uppercase tracking-wider bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 shrink-0"
        >
          {showAddForm ? <X className="size-4" /> : <Plus className="size-4" />}
          <span>{showAddForm ? "Cancel Form" : "Log Ward Priority"}</span>
        </Button>
      </div>

      {/* Add New Grievance Inline Form */}
      {showAddForm && (
        <form
          onSubmit={handleCreateGrievance}
          className="border-2 border-primary/40 bg-card p-6 shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between border-b border-border/80 pb-2">
            <h2 className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
              Submit Constituency Priority Issue
            </h2>
            <span className="font-ui text-xs text-muted-foreground">Logged as: {user?.name}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-ui uppercase tracking-wider font-semibold text-foreground mb-1">
                Issue Summary / Title *
              </label>
              <Input
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Silt blockage at Bazar primary drainage outfall"
                className="rounded-none text-sm h-10"
              />
            </div>

            <div>
              <label className="block text-xs font-ui uppercase tracking-wider font-semibold text-foreground mb-1">
                Ward Number *
              </label>
              <select
                value={newWard}
                onChange={(e) => setNewWard(Number(e.target.value) as WardNumber)}
                className="w-full h-10 border border-input bg-background px-3 text-sm rounded-none font-sans text-foreground"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((w) => (
                  <option key={w} value={w}>
                    Ward {w}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-ui uppercase tracking-wider font-semibold text-foreground mb-1">
                Specific Locality / Landmark *
              </label>
              <Input
                required
                value={newLocality}
                onChange={(e) => setNewLocality(e.target.value)}
                placeholder="e.g. Near Heituppokpi Community Hall"
                className="rounded-none text-sm h-10"
              />
            </div>

            <div>
              <label className="block text-xs font-ui uppercase tracking-wider font-semibold text-foreground mb-1">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as GrievanceCategory)}
                className="w-full h-10 border border-input bg-background px-3 text-sm rounded-none font-sans text-foreground"
              >
                <option value="WATER_AND_DRAINAGE">Water &amp; Drainage</option>
                <option value="ROAD_CONNECTIVITY">Roads &amp; Connectivity</option>
                <option value="MUNICIPAL_SERVICES">Municipal Services</option>
                <option value="EDUCATION_STEM">Education &amp; STEM</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-ui uppercase tracking-wider font-semibold text-foreground mb-1">
                Urgency Priority
              </label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as GrievancePriority)}
                className="w-full h-10 border border-input bg-background px-3 text-sm rounded-none font-sans text-foreground"
              >
                <option value="ROUTINE">Routine Maintenance</option>
                <option value="URGENT">Urgent (Before Rains)</option>
                <option value="CRITICAL">Critical Emergency</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-ui uppercase tracking-wider font-semibold text-foreground mb-1">
              Detailed Description &amp; Ground Evidence *
            </label>
            <textarea
              required
              rows={3}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Describe the physical condition, number of households affected, or specific impediment..."
              className="w-full border border-input bg-background p-3 text-sm rounded-none font-sans text-foreground focus-visible:outline-2 focus-visible:outline-primary"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddForm(false)}
              className="rounded-none text-xs font-ui uppercase"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-none text-xs font-ui uppercase font-semibold bg-primary text-primary-foreground"
            >
              Submit to Ward Desk
            </Button>
          </div>
        </form>
      )}

      {/* Filter & Search Bar */}
      <div className="border border-border bg-card p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search issues, localities, IDs..."
              className="pl-9 h-10 rounded-none text-xs"
            />
          </div>

          {/* Ward Filter */}
          <div>
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="w-full h-10 border border-input bg-background px-3 text-xs rounded-none font-sans text-foreground"
            >
              <option value="ALL">All 12 Wards</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((w) => (
                <option key={w} value={String(w)}>
                  Ward {w}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full h-10 border border-input bg-background px-3 text-xs rounded-none font-sans text-foreground"
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
              className="w-full h-10 border border-input bg-background px-3 text-xs rounded-none font-sans text-foreground"
            >
              <option value="ALL">All Categories</option>
              <option value="WATER_AND_DRAINAGE">Water &amp; Drainage</option>
              <option value="ROAD_CONNECTIVITY">Roads &amp; Connectivity</option>
              <option value="MUNICIPAL_SERVICES">Municipal Services</option>
              <option value="EDUCATION_STEM">Education &amp; STEM</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-muted-foreground font-ui pt-1">
          <span>Showing {filteredTickets.length} of {grievances.length} constituency records</span>
          {(searchQuery || selectedWard !== "ALL" || selectedStatus !== "ALL" || selectedCategory !== "ALL") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("")
                setSelectedWard("ALL")
                setSelectedStatus("ALL")
                setSelectedCategory("ALL")
              }}
              className="text-primary dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="size-3" /> Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Grievance Ledger Items */}
      <div className="space-y-3">
        {filteredTickets.map((ticket) => {
          const isEditing = editingTicketId === ticket.id
          const canManage = role === "ward_coordinator" || role === "desk_admin"

          return (
            <div
              key={ticket.id}
              className="border border-border bg-card p-5 shadow-xs transition-colors hover:border-primary/40 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-foreground">
                      {ticket.id}
                    </span>
                    <span className="text-muted-foreground">·</span>
                    <span className="font-ui text-xs font-semibold uppercase text-primary dark:text-emerald-400 flex items-center gap-1">
                      <MapPin className="size-3" /> Ward {ticket.ward} ({ticket.locality})
                    </span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-[11px] font-sans text-muted-foreground">
                      Logged {new Date(ticket.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-base text-foreground leading-snug">
                    {ticket.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-[11px] font-ui uppercase font-bold tracking-wider px-2.5 py-1 border ${statusBadges[ticket.status]}`}
                  >
                    {ticket.status.replace(/_/g, " ")}
                  </span>

                  {canManage && !isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingTicketId(ticket.id)
                        setEditStatus(ticket.status)
                        setEditNotes(ticket.fieldVerificationNotes || "")
                      }}
                      className="h-7 text-[11px] font-ui uppercase rounded-none"
                    >
                      Audit
                    </Button>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed">
                {ticket.description}
              </p>

              {/* Status Updater Panel for Coordinators/Admin */}
              {isEditing && (
                <div className="border-t border-border pt-3 mt-3 p-3 bg-muted/30 space-y-3">
                  <div className="flex items-center justify-between text-xs font-ui font-bold uppercase text-primary dark:text-emerald-400">
                    <span>Field Verification &amp; Status Update</span>
                    <button
                      type="button"
                      onClick={() => setEditingTicketId(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-ui uppercase text-muted-foreground mb-1">
                        Update Status
                      </label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value as GrievanceStatus)}
                        className="w-full h-9 border border-input bg-background px-2 text-xs rounded-none font-sans"
                      >
                        <option value="PROPOSED">PROPOSED</option>
                        <option value="UNDER_REVIEW">UNDER REVIEW</option>
                        <option value="FIELD_VERIFIED">FIELD VERIFIED</option>
                        <option value="DISPATCHED_TO_MUNICIPALITY">DISPATCHED TO MUNICIPALITY</option>
                        <option value="RESOLVED">RESOLVED</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-ui uppercase text-muted-foreground mb-1">
                        Inspector Notes
                      </label>
                      <Input
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        placeholder="e.g. Inspected site. Verified 40cm silt blockage..."
                        className="h-9 rounded-none text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingTicketId(null)}
                      className="h-8 text-[11px] font-ui uppercase rounded-none"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleSaveStatus(ticket.id)}
                      className="h-8 text-[11px] font-ui uppercase font-semibold bg-primary text-primary-foreground rounded-none"
                    >
                      Save Status
                    </Button>
                  </div>
                </div>
              )}

              {/* Field Notes & Dispatch Reference Footer */}
              <div className="border-t border-border/60 pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] font-sans text-muted-foreground">
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
                    <CheckCircle2 className="size-3 text-emerald-600 dark:text-emerald-400" />
                    <span>{ticket.fieldVerificationNotes}</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
