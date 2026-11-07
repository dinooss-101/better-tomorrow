import type { Config } from "tailwindcss"
import typography from "@tailwindcss/typography"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-public-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-oswald)", "sans-serif"],
        ui: ["var(--font-montserrat)", "sans-serif"],
      },
      typography: ({
        theme,
      }: {
        theme: (path: string) => string[] | string
      }) => ({
        DEFAULT: {
          css: {
            "h1, h2, h3, h4, h5, h6": {
              fontFamily: (theme("fontFamily.display") as string[]).join(", "),
              letterSpacing: theme("letterSpacing.tight"),
              lineHeight: theme("lineHeight.tight"),
              fontWeight: "700",
              textTransform: "uppercase",
            },
            p: {
              lineHeight: theme("lineHeight.relaxed"),
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
}

export default config
