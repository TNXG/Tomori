import type { Config } from "tailwindcss";
import daisyui from "daisyui";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const twConfig: Config = {
	darkMode: ["class", '[data-theme="dark"]'],
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./layouts/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				satoshi: "Satoshi",
				sans: "MiSans_VF",
				serif: "Noto Serif CJK SC",
				mono: "JetBrainsMono",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			colors: {
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
			},
			typography: {
				DEFAULT: {
					css: {
						color: "#2c2c2c",
						lineHeight: "1.4",
						paddingLeft: "4rem",
						paddingRight: "4rem",
						a: {
							color: "#1d4ed8",
							textDecoration: "underline",
							"&:hover": {
								color: "#1e40af",
								textDecoration: "none",
							},
						},
						h1: {
							fontWeight: "700",
							fontSize: "2.5rem",
							lineHeight: "1.2",
							marginBottom: "1rem",
						},
						h2: {
							fontWeight: "600",
							fontSize: "2rem",
							lineHeight: "1.3",
							marginBottom: "0.75rem",
						},
						h3: {
							fontWeight: "600",
							fontSize: "1.75rem",
							lineHeight: "1.4",
							marginBottom: "0.5rem",
						},
						p: {
							marginBottom: "1rem",
							"&:last-child": {
								marginBottom: "0",
							},
							fontSize: "1.125rem",
							fontWeight: "normal",
						},
						blockquote: {
							paddingLeft: "1rem",
							borderLeftWidth: "0.25rem",
							borderLeftColor: "#e5e7eb",
							color: "#6b7280",
							quotes: "“”",
						},
						code: {
							backgroundColor: "#f3f4f6",
							padding: "0.2rem 0.4rem",
							borderRadius: "0.25rem",
							color: "#d97706",
						},
						ul: {
							paddingLeft: "1.5rem",
							listStyleType: "disc",
							"& li": {
								marginBottom: "0.5rem",
							},
						},
						ol: {
							paddingLeft: "1.5rem",
							listStyleType: "decimal",
							"& li": {
								marginBottom: "0.5rem",
							},
						},
					},
				},
				dark: {
					css: {
						color: "#e0e0e0",
						a: {
							color: "#60a5fa",
							"&:hover": {
								color: "#93c5fd",
							},
						},
					},
				},
			},
		},
	},
	plugins: [tailwindcssAnimate, daisyui, typography({ target: "modern" })],
};

export default twConfig;
