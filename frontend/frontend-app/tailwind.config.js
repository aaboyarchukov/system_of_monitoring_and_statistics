/** @type {import('tailwindcss').Config} */
import animatePlugin from 'tailwindcss-animate';

module.exports = {
    darkMode: ["class"],
    content: [
      "./src/app/**/*.{ts,tsx}",
      "./src/components/**/*.{ts,tsx}",
      "./app/**/*.{ts,tsx}",
      "./src/**/*.{ts,tsx}",
      "*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        fontFamily: {
          sans: ['var(--font-montserrat)', 'sans-serif'],
        },
        
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "#374b9b",
            foreground: "#ffffff",
          },
          secondary: {
            DEFAULT: "#0f2d69",
            foreground: "#ffffff",
          },
          muted: {
            DEFAULT: "#d9d9d9",
            foreground: "#0f2d69",
          },
          accent: {
            DEFAULT: "#b5b5b5",
            foreground: "#0f2d69",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
          "accordion-down": {
            from: { height: 0 },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: 0 },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
    },
    plugins: [animatePlugin],
  }
  