import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ProjectStatusBadge } from "./project-status-badge"

const meta = {
  title: "Civic/ProjectStatusBadge",
  component: ProjectStatusBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProjectStatusBadge>

export default meta
type Story = StoryObj<typeof meta>

export const WorksInProgress: Story = {
  args: {
    stage: "IMPLEMENTATION",
    condition: "NORMAL",
  },
}

export const Delayed: Story = {
  args: {
    stage: "IMPLEMENTATION",
    condition: "DELAYED",
  },
}

export const Completed: Story = {
  args: {
    stage: "COMPLETED",
    condition: "NORMAL",
  },
}

export const Proposed: Story = {
  args: {
    stage: "PROPOSED",
    condition: "UNDER_VERIFICATION",
  },
}

