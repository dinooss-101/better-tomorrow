import React from "react"
import { Droplets } from "lucide-react"
import { Container, Section, EditorialSplit, TextLink } from "@/components/primitives"
import { ImagePlaceholder } from "@/components/ui/image-placeholder"

export function HomeEcologicalBrief() {
  return (
    <Section border>
      <Container>
        <EditorialSplit>
          <div className="lg:col-span-6 space-y-5">
            <p className="font-ui text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-2">
              <Droplets className="size-3.5" />
              <span>Immediate Ecological Priority</span>
            </p>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-foreground leading-tight">
              The Critical Drainage Corridor: Central Bazar to Loktak Outfall
            </h2>

            <p className="font-sans text-xs sm:text-sm leading-relaxed text-muted-foreground font-normal">
              Field contour mapping reveals that natural gravity discharge routes toward Loktak Lake are obstructed by uncoordinated building across flood detention basins. During peak monsoon months, water accumulates in Ward 1, 3, and 7.
            </p>

            <div className="font-sans space-y-3 pt-2 text-xs text-muted-foreground">
              <div className="flex items-start gap-2.5">
                <span className="font-ui font-semibold text-primary">A.</span>
                <span><strong>Pre-Monsoon Desiltation:</strong> Mechanized desiltation of the 3.8 km main corridor completed prior to heavy rainfall.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="font-ui font-semibold text-primary">B.</span>
                <span><strong>Culvert Widening:</strong> Replacing narrow 600mm RCC pipes with 1200mm box culverts at major bazaar intersections.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="font-ui font-semibold text-primary">C.</span>
                <span><strong>Gravity Retention Basins:</strong> Designating natural low-lying depressions to buffer surface runoff before road overflow.</span>
              </div>
            </div>

            <div className="pt-2">
              <TextLink href="/development">Drainage Survey</TextLink>
            </div>
          </div>

          <div className="lg:col-span-6">
            <ImagePlaceholder
              src="/image/drainage-hydrology-outfall.png"
              alt="Field hydrological inspection of primary gravity drainage outfall toward Loktak basin"
              aspectRatio="1/1"
              category="Hydrological Field Inspection"
              location="Chabrou & Bazar Outfalls"
              title="Field hydrological inspection of primary drainage outfall toward Loktak basin"
              hint="Field Engineering Survey"
            />
          </div>
        </EditorialSplit>
      </Container>
    </Section>
  )
}

