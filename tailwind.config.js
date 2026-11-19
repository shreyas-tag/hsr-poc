/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', "system-ui", "sans-serif"],
        display: ['"Archivo Variable"', '"Inter Variable"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      fontSize: {
        "2xs": ["11px", "16px"],
        xs: ["12px", "18px"],
        sm: ["13px", "20px"],
        base: ["14px", "22px"],
        lg: ["16px", "24px"],
        xl: ["20px", "28px"],
      },
      colors: {
        ink: { DEFAULT: "#0F1115", 2: "#2B2F36", 3: "#5A606B", 4: "#8A909A", 5: "#B9BEC6" },
        line: { DEFAULT: "#E4E7EC", 2: "#EEF0F3", 3: "#D3D7DE" },
        canvas: "#F5F6F8",
        panel: "#FFFFFF",
        steel: { 950: "#0B0D10", 900: "#111418", 850: "#161A1F", 800: "#1C2127", 700: "#2A3038", 600: "#3B434D", 500: "#59626E", 400: "#8A93A0", 300: "#B6BDC7", 200: "#D8DDE3", 100: "#ECEFF2", 50: "#F6F7F9" },
        flame: { DEFAULT: "#FF5A1F", 600: "#E8490F", 700: "#C23A08", 100: "#FFE7DC", 50: "#FFF4EE" },
        good: { DEFAULT: "#1E8A52", bg: "#E6F5EC" },
        warn: { DEFAULT: "#B26B00", bg: "#FFF3DC" },
        crit: { DEFAULT: "#C4352B", bg: "#FDECEA" },
        info: { DEFAULT: "#2F64B4", bg: "#EAF1FB" },
      },
      boxShadow: {
        pop: "0 18px 40px -12px rgba(10,14,20,.28), 0 4px 10px -4px rgba(10,14,20,.08)",
        card: "0 1px 2px rgba(10,14,20,.05), 0 1px 1px rgba(10,14,20,.03)",
        hair: "0 1px 0 rgba(10,14,20,.04)",
      },
      borderRadius: { md: "6px", lg: "10px", xl: "14px", "2xl": "18px" },
    },
  },
  plugins: [],
};
