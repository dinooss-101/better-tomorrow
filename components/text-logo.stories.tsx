import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TextLogo } from "./text-logo"

const meta = {
  title: "Brand/TextLogo",
  component: TextLogo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof TextLogo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: "md",
  },
}

export const Large: Story = {
  args: {
    size: "lg",
  },
}

export const Small: Story = {
  args: {
    size: "sm",
  },
}

