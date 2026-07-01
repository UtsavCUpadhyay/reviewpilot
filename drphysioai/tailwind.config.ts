import type { Config } from "tailwindcss";

/**
 * DrPhysioAI Design System — Tailwind configuration.
 *
 * Colors are driven by CSS variables (see app/globals.css) so the same tokens
 * power both light and dark themes. Brand ramps (teal / blue / violet / coral)
 * are fixed values used for gradients, glows and illustrations.
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // Fixed brand ramps for gradients + accents
        teal: {
          50: "#ecfeff",
          100: "#cffafe",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#0fbfb4",
          600: "#0891a3",
          700: "#0e7490",
        },
        brandblue: {
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
        },
        violet: {
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
        },
        coral: {
          400: "#fb7185",
          500: "#f43f5e",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16,24,40,0.04), 0 8px 24px -8px rgba(16,24,40,0.12)",
        card: "0 2px 4px rgba(16,24,40,0.04), 0 24px 48px -16px rgba(16,24,40,0.14)",
        glow: "0 0 0 1px rgba(15,191,180,0.18), 0 20px 60px -18px rgba(15,191,180,0.45)",
        "glow-violet": "0 0 0 1px rgba(124,58,237,0.18), 0 20px 60px -18px rgba(124,58,237,0.45)",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(120deg, #0fbfb4 0%, #2563eb 55%, #7c3aed 100%)",
        "brand-soft":
          "linear-gradient(120deg, rgba(15,191,180,0.14), rgba(124,58,237,0.14))",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-22px) rotate(3deg)" },
        },
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { opacity: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        "gradient-pan": "gradient-pan 8s ease infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
