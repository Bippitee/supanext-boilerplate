const plugin = require("tailwindcss/plugin");
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    "./src/layouts/**/*.{html,js}",
  ],
  prefix: "",
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
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: ".75rem", letterSpacing: ".05em" }],
      },
      letterSpacing: {
        wider: ".05em",
      },
      textShadow: {
        sm: "0.5px 1px 0 #CCCCCC, 1px 2px 0 #c9c9c9, 1.5px 3px 0 #bbb, 2px 4px 0 #b9b9b9, 2.5px 5px 0 #aaa, 3px 6px 1px rgba(0,0,0,.1), 0 0 2px rgba(0,0,0,.1), 0.5px 1px 1px rgba(0,0,0,.3), 1px 2px 3px rgba(0,0,0,.2), 1.5px 3px 5px rgba(0,0,0,.25), 2.5px 5px 5px rgba(0,0,0,.2), 3.5px 7px 7px rgba(0,0,0,.15)",
        DEFAULT:
          "0.5px 1px 0 #CCCCCC, 1px 2px 0 #c9c9c9, 1.5px 3px 0 #bbb, 2px 4px 0 #b9b9b9, 2.5px 5px 0 #aaa, 3px 6px 1px rgba(0,0,0,.1), 0 0 3px rgba(0,0,0,.1), 0.5px 1px 2px rgba(0,0,0,.3), 1.5px 3px 4px rgba(0,0,0,.2), 2.5px 5px 7px rgba(0,0,0,.25), 3.5px 7px 7px rgba(0,0,0,.2), 5px 10px 10px rgba(0,0,0,.15)",
        lg: "0.5px 1px 0 #CCCCCC, 1px 2px 0 #c9c9c9, 1.5px 3px 0 #bbb, 2px 4px 0 #b9b9b9, 2.5px 5px 0 #aaa, 3px 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0.5px 1px 3px rgba(0,0,0,.3), 1.5px 3px 5px rgba(0,0,0,.2), 2.5px 5px 10px rgba(0,0,0,.25), 5px 10px 10px rgba(0,0,0,.2), 10px 20px 20px rgba(0,0,0,.15)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "pop-in": {
          from: { transform: "scale(0)" },
          to: { transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.75s ease-out forwards",
        "fade-out": "fade-out 0.75s ease-out forwards",
        "pop-in": "pop-in 1s cubic-bezier(.62,.42,.62,1.17) forwards",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".card": {
          borderWidth: "1px",
          display: "flex",
          flexDirection: "column",
          padding: theme("spacing.4"),
          borderColor: theme("colors.border"),
          backgroundColor: theme("colors.card.DEFAULT"),
          height: "100%",
          color: theme("colors.card.foreground"),
          transition: "border-color 0.2s ease-out",
          "&:hover": {
            borderColor: "hsl(var(--foreground) / .5)",
          },
          "& header": {
            textTransform: "uppercase",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "middle",
            fontSize: theme("fontSize.sm"),
          },
          "& .content": {
            flexGrow: 1,
            display: "flex",
            alignItems: "flex-end",
          },
          "& footer": {
            borderTopWidth: "1px",
            borderTopColor: theme("colors.border"),
            borderTopStyle: "solid",
            fontSize: theme("fontSize.2xs"),
            letterSpacing: "0.075em",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "middle",
            paddingTop: theme("spacing.4"),
            marginTop: theme("spacing.4"),
            textTransform: "uppercase",
          },
          "&.accent": {
            color: theme("colors.accent.foreground"),
            backgroundColor: theme("colors.accent.DEFAULT"),
            "& footer": {
              borderColor: theme("colors.secondary.DEFAULT"),
            },
          },
          "&.secondary": {
            color: theme("colors.secondary.foreground"),
            backgroundColor: theme("colors.secondary.DEFAULT"),
          },
        },
        ".bg-striped": {
          backgroundImage:
            "repeating-linear-gradient(-45deg,hsl(var(--background)),hsl(var(--background)) 10px,hsl(var(--muted) / 0.3) 10px,hsl(var(--muted) / 0.3) 20px)",
        },
        ".container": {
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
        },
        ".perspective": {
          perspective: "1000px",
        },
        ".preserve3d": {
          transformStyle: "preserve-3d",
        },
        ".rotate-y-180": {
          transform: "rotateY(180deg)",
        },
        ".-rotate-y-180": {
          transform: "rotateY(-180deg)",
        },
        ".backface-hidden": {
          backfaceVisibility: "hidden",
        },
      });
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
