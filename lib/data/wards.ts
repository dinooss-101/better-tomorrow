import { WardNumber } from "@/lib/types/auth"

export interface CanonicalWard {
  ward: WardNumber
  name: string
  localName: string
  keyLandmark: string
  primaryOutfall: string
  householdsApprox: number
}

export const CANONICAL_WARDS: readonly CanonicalWard[] = [
  {
    ward: 1,
    name: "Konchak Awang",
    localName: "কোন্চক অৱাং",
    keyLandmark: "Awang Leikai Primary Drainage Channel",
    primaryOutfall: "Northern Perimeter Drainage Bund",
    householdsApprox: 480,
  },
  {
    ward: 2,
    name: "Konchak Makha",
    localName: "কোন্চক মখা",
    keyLandmark: "Konchak Makha Community Ground",
    primaryOutfall: "Makha Main Arterial Drain",
    householdsApprox: 520,
  },
  {
    ward: 3,
    name: "Heituppokpi",
    localName: "হৈতুপপোকপী",
    keyLandmark: "Heituppokpi Community Hall & School",
    primaryOutfall: "Heituppokpi Secondary Drain",
    householdsApprox: 410,
  },
  {
    ward: 4,
    name: "Bazaar South",
    localName: "বজার খা",
    keyLandmark: "Southern Commercial Outfall & Shophouses",
    primaryOutfall: "Bazaar South Interceptor",
    householdsApprox: 610,
  },
  {
    ward: 5,
    name: "Central Bazar",
    localName: "ময়finalize বজার ময়ায়",
    keyLandmark: "Constituency Grievance Desk & Market Shed",
    primaryOutfall: "Central Market Box Culvert",
    householdsApprox: 750,
  },
  {
    ward: 6,
    name: "Chanam Pukhri",
    localName: "চানম পুক্হ্রী",
    keyLandmark: "Chanam Pukhri Water Body Buffer",
    primaryOutfall: "Pukhri Perimeter Catchment",
    householdsApprox: 390,
  },
  {
    ward: 7,
    name: "Chirai Awang",
    localName: "চিরোই অৱাং",
    keyLandmark: "Chirai River Approach Road",
    primaryOutfall: "Chirai North Flood Outfall",
    householdsApprox: 460,
  },
  {
    ward: 8,
    name: "Chirai Makha",
    localName: "চিরোই মখা",
    keyLandmark: "Agricultural Bund & Retaining Slab",
    primaryOutfall: "Chirai Irrigation Sluice Gate",
    householdsApprox: 540,
  },
  {
    ward: 9,
    name: "Thana Maning",
    localName: "থানা মানিং",
    keyLandmark: "Police Outpost Corridor & Health Sub-centre",
    primaryOutfall: "Maning Canal Outfall",
    householdsApprox: 430,
  },
  {
    ward: 10,
    name: "Wangoi East",
    localName: "ৱাংগোই নোংপোক",
    keyLandmark: "Wangoi Boundary Agricultural Drain",
    primaryOutfall: "Eastern Border Canal",
    householdsApprox: 380,
  },
  {
    ward: 11,
    name: "Kokhai Awang",
    localName: "কোকহাই অৱাং",
    keyLandmark: "Kokhai Culvert Gate & Feeder School",
    primaryOutfall: "Kokhai Northern Link Drain",
    householdsApprox: 490,
  },
  {
    ward: 12,
    name: "Kokhai Makha",
    localName: "কোকহাই মখা",
    keyLandmark: "Southern Agrarian Bund & Wet Field Zone",
    primaryOutfall: "Southern Tail-end Sluice",
    householdsApprox: 450,
  },
] as const

export function getWardByNumber(wardNum: WardNumber | number): CanonicalWard | undefined {
  return CANONICAL_WARDS.find((w) => w.ward === wardNum)
}

export function formatWardLabel(wardNum: WardNumber | number): string {
  const w = getWardByNumber(wardNum)
  return w ? `Ward ${w.ward} · ${w.name}` : `Ward ${wardNum}`
}

