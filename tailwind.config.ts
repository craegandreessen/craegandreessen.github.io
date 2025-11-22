import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Masculine hunting palette - dark mode first
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        // Custom HuntFlow colors
        hunter: {
          charcoal: {
            DEFAULT: "#1a1d1f",
            50: "#f6f6f7",
            100: "#e1e2e4",
            200: "#c4c5c9",
            300: "#9fa1a7",
            400: "#7b7e85",
            500: "#62656c",
            600: "#4e5056",
            700: "#424347",
            800: "#39393c",
            900: "#323335",
            950: "#1a1d1f",
          },
          green: {
            DEFAULT: "#2d5016",
            50: "#f4f7f2",
            100: "#e5ebe0",
            200: "#ccd8c2",
            300: "#a8bf9a",
            400: "#81a06f",
            500: "#62844f",
            600: "#4c693c",
            700: "#3d5432",
            800: "#34442b",
            900: "#2d5016",
            950: "#162411",
          },
          bronze: {
            DEFAULT: "#cd7f32",
            50: "#fdf8f3",
            100: "#faeee0",
            200: "#f4dbc0",
            300: "#ecc196",
            400: "#e39d6a",
            500: "#dc844a",
            600: "#cd7f32",
            700: "#b8622a",
            800: "#925027",
            900: "#754322",
            950: "#3f2011",
          },
          leather: {
            DEFAULT: "#704214",
            50: "#faf6f2",
            100: "#f2e8dc",
            200: "#e4ceb7",
            300: "#d3ad8c",
            400: "#c38d64",
            500: "#b8754a",
            600: "#ab603e",
            700: "#8e4d35",
            800: "#704214",
            900: "#5e382c",
            950: "#331d16",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-recoleta)", "Georgia", "serif"],
        mono: ["var(--font-geist-mono)", "Menlo", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "camo-pattern": "url('/textures/camo-subtle.png')",
        "wood-texture": "url('/textures/wood-grain.png')",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
