import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    safelist: [
        "text-green",
        "text-blue",
        "text-yellow",
        "text-orange",
        "bg-green",
        "bg-blue",
        "bg-yellow",
        "bg-orange",
        "hover:text-blue",
        "hover:bg-blue-2",
        "border-blue",
        "border-yellow",
        "border-green",
        "border-orange",
        "focus:ring-yellow",
        "focus:border-yellow",
        "focus:ring-orange",
        "focus:border-orange",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            colors: {
                green: {
                    DEFAULT: "hsl(var(--green))",
                    2: "#2E937E",
                    3: "#CEF1EA",
                },
                yellow: {
                    DEFAULT: "hsl(var(--yellow))",
                    2: "#D9AA1C",
                },

                blue: {
                    DEFAULT: "hsl(var(--blue))",
                    2: "#609FE8",
                    3: "#718EBF",
                    4: "#829CC7",
                    5: "#343C6A",
                },
                orange: {
                    DEFAULT: "hsl(var(--orange))",
                },
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
                    1: "hsl(var(--chart-1))",
                    2: "hsl(var(--chart-2))",
                    3: "hsl(var(--chart-3))",
                    4: "hsl(var(--chart-4))",
                    5: "hsl(var(--chart-5))",
                },
            },
        },
    },

    plugins: [forms, require("tailwindcss-animate")],
};
