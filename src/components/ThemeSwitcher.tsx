"use client";

import { motion } from "framer-motion";
import { tv } from "tailwind-variants";
import { useIsClient } from "@/lib/use-is-client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const iconClassNames = "h-4 w-4 text-current";

const styles = tv({
	base: "rounded-inherit inline-flex h-[32px] w-[32px] items-center justify-center border-0 text-current",
	variants: {
		status: {
			active: "bg-gray-200 dark:bg-gray-700 rounded-full",
			inactive: "bg-transparent",
		},
	},
});

const SunIcon = () => (
	<svg
		className={iconClassNames}
		fill="none"
		height="24"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="1.5"
		viewBox="0 0 24 24"
		width="24"
	>
		<circle cx="12" cy="12" r="5" />
		<path d="M12 1v2" />
		<path d="M12 21v2" />
		<path d="M4.22 4.22l1.42 1.42" />
		<path d="M18.36 18.36l1.42 1.42" />
		<path d="M1 12h2" />
		<path d="M21 12h2" />
		<path d="M4.22 19.78l1.42-1.42" />
		<path d="M18.36 5.64l1.42-1.42" />
	</svg>
);

const SystemIcon = () => (
	<svg
		className={iconClassNames}
		fill="none"
		height="24"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="1.5"
		viewBox="0 0 24 24"
		width="24"
	>
		<rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
		<path d="M8 21h8" />
		<path d="M12 17v4" />
	</svg>
);

const DarkIcon = () => (
	<svg
		fill="none"
		height="24"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="1.5"
		viewBox="0 0 24 24"
		width="24"
		className={iconClassNames}
	>
		<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
	</svg>
);

export const ThemeSwitcher = () => {
	const { theme, setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		const storedTheme = localStorage.getItem("theme");
		// 初始化时从 localStorage 中获取主题状态
		if (!storedTheme || storedTheme === "system") {
			setTheme("system");
			updateSystemTheme();
		}
	}, [setTheme]);

	const updateSystemTheme = () => {
		const isDarkMode = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		document.documentElement.setAttribute(
			"data-theme",
			isDarkMode ? "dark" : "light",
		);
	};

	// 监听系统配色变化
	useEffect(() => {
		const handleSystemThemeChange = (e: MediaQueryListEvent) => {
			if (theme === "system") {
				document.documentElement.setAttribute(
					"data-theme",
					e.matches ? "dark" : "light",
				);
			}
		};

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		mediaQuery.addEventListener("change", handleSystemThemeChange);

		return () =>
			mediaQuery.removeEventListener("change", handleSystemThemeChange);
	}, [theme]);

	const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
		localStorage.setItem("theme", newTheme);
		setTheme(newTheme);

		if (newTheme === "system") {
			updateSystemTheme();
		} else {
			setTheme(newTheme);
		}
	};

	if (!mounted) return null;

	return (
		<div className="relative inline-block">
			<ThemeIndicator theme={resolvedTheme ?? theme ?? "system"} />
			<ButtonGroup theme={theme ?? "system"} setTheme={handleThemeChange} />
		</div>
	);
};

const ThemeIndicator = ({ theme }: { theme: string }) => {
	const isClient = useIsClient();

	if (!isClient) return null;

	return (
		<motion.div
			className="absolute top-[4px] z-[-1] size-[32px] rounded-full bg-base-100 shadow-[0_1px_2px_0_rgba(127.5,127.5,127.5,.2),_0_1px_3px_0_rgba(127.5,127.5,127.5,.1)]"
			style={{
				left: { light: 4, system: 36, dark: 68 }[theme],
			}}
			animate={{
				left: { light: 4, system: 36, dark: 68 }[theme],
				opacity: 1,
				scale: 1,
			}}
			transition={{ type: "spring", stiffness: 300, damping: 25 }}
		/>
	);
};

const ButtonGroup = ({
	theme,
	setTheme,
}: {
	theme: string;
	setTheme: (theme: "light" | "dark" | "system") => void;
}) => {
	const buttons = [
		{ theme: "light", icon: <SunIcon />, label: "Switch to light theme" },
		{ theme: "system", icon: <SystemIcon />, label: "Switch to system theme" },
		{ theme: "dark", icon: <DarkIcon />, label: "Switch to dark theme" },
	];

	return (
		<div className="flex rounded-full border p-[3px] dark:border-zinc-700">
			{buttons.map(({ theme: btnTheme, icon, label }) => (
				<motion.button
					key={btnTheme}
					aria-label={label}
					type="button"
					className={`${styles.base} ${
						theme === btnTheme
							? styles.variants.status.active
							: styles.variants.status.inactive
					}`}
					onClick={() => setTheme(btnTheme as "light" | "dark" | "system")}
					whileTap={{ scale: 0.95 }} // 点击时减少缩放幅度
					whileHover={{ scale: 1.05 }} // 悬停时减少缩放幅度
					transition={{
						type: "spring",
						stiffness: 300,
						damping: 20,
						duration: 0.3,
					}} // 调整动画的过渡效果
				>
					<motion.div
						initial={{ opacity: 0, y: 5 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 5 }}
						transition={{ type: "spring", stiffness: 500, damping: 30 }}
					>
						{icon}
					</motion.div>
				</motion.button>
			))}
		</div>
	);
};
