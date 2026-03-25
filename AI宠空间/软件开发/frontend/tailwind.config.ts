import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#070B14",
        surface: {
          1: "#111827",
          2: "#1F2937",
          3: "#374151",
        },
        border: "#334155",
        primary: {
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
        },
        accent: {
          500: "#0EA5E9",
        },
        danger: {
          500: "#EF4444",
        },
        warning: {
          500: "#F59E0B",
        },
        text: {
          1: "#F8FAFC",
          2: "#CBD5E1",
          3: "#94A3B8",
        },
      },
      borderRadius: {
        '1': '8px',
        '2': '12px',
        '3': '16px',
        'pill': '999px',
      },
      spacing: {
        '0': '0',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '24px',
        '6': '32px',
        '7': '40px',
        '8': '48px',
      },
      fontSize: {
        'xs': ['12px', '18px'],
        'sm': ['14px', '22px'],
        'md': ['16px', '24px'],
        'lg': ['20px', '30px'],
        'xl': ['28px', '36px'],
      },
      boxShadow: {
        'e1': '0 2px 8px rgba(2, 6, 23, 0.2)',
        'e2': '0 8px 24px rgba(2, 6, 23, 0.28)',
        'e3': '0 14px 40px rgba(2, 6, 23, 0.38)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(1200px 600px at 20% -10%, rgba(34, 197, 94, 0.18), transparent 60%), radial-gradient(1200px 700px at 110% 10%, rgba(14, 165, 233, 0.12), transparent 60%)',
      },
      transitionDuration: {
        'fast': '120ms',
        'mid': '220ms',
        'slow': '320ms',
      },
      transitionTimingFunction: {
        'standard': 'cubic-bezier(0.2, 0, 0, 1)',
      },
    },
  },
  plugins: [],
};
export default config;
