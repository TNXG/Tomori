"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { NavLinksConfig } from "@/config";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";
import { getProtocolAndDomain } from "@/lib/dom-utils";

interface NavigationTopProps {
	AggregationData: AggregationData;
}

const NavigationTop = ({ AggregationData }: NavigationTopProps) => {
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const [isFloating, setIsFloating] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [URL, setURL] = useState("");
	const NavLinks = NavLinksConfig;

	useEffect(() => {
		setURL(getProtocolAndDomain());
		const handleScroll = () => {
			const distanceFromTop = window.scrollY;
			const newIsFloating = distanceFromTop > 50;
			setIsFloating(newIsFloating);
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll();
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		const handleDarkMode = () => {
			setIsDarkMode(
				document.documentElement.getAttribute("data-theme") === "dark",
			);
		};
		handleDarkMode();
		const observer = new MutationObserver(handleDarkMode);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-theme"],
		});
		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<header className="sticky top-0 z-50 font-satoshi">
			<div
				className={`transition-all border-b border-transparent dark:bg-gray-800 ${isFloating ? "dark:bg-gray-900 dark:shadow-lg" : ""}`}
				style={{
					width: isFloating ? "88%" : "100%",
					position: isFloating ? "fixed" : "relative",
					top: isFloating ? "10px" : "0",
					left: isFloating ? "6%" : "0",
					backgroundColor: isFloating
						? isDarkMode
							? "rgba(31, 41, 55, 0.9)"
							: "rgba(255, 255, 255, 0.9)"
						: "rgba(255, 255, 255, 0)",
					boxShadow: isFloating ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none",
					borderRadius: isFloating ? "15px" : "0px",
					transition: "all 0.2s",
				}}
			>
				<div className="container mx-auto px-4 py-4 flex justify-between items-center">
					<div className="flex items-center space-x-2">
						<span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-orange-500 dark:to-yellow-500">
							<Link href={URL}>{AggregationData.seo.title}</Link>
						</span>
					</div>
					<div className="flex-grow" />

					{/* 右侧导航栏链接和搜索按钮 */}
					<div className="flex items-center space-x-6">
						<nav className="hidden md:flex space-x-6">
							{NavLinks.map((item) => (
								<div
									key={item.name}
									className="relative group"
									onMouseEnter={() => setActiveDropdown(item.name)}
									onMouseLeave={() => setActiveDropdown(null)}
								>
									<Link
										href={item.href}
										className="text-gray-700 dark:text-gray-300 font-medium px-4 py-2 rounded-lg transition-all duration-150 ease-in-out hover:bg-purple-100 dark:hover:bg-gray-600"
									>
										{item.name}
										{item.dropdownItems && (
											<Icon
												icon="mingcute:down-fill"
												className="inline-block ml-1 w-4 h-4 dark:text-yellow-500"
											/>
										)}
									</Link>
									{item.dropdownItems && activeDropdown === item.name && (
										<div
											className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-20"
											style={{ padding: "0.25rem" }}
										>
											{item.dropdownItems.map((dropdownItem) => (
												<Link
													key={dropdownItem}
													href="#"
													className="flex items-center justify-center text-base text-gray-700 dark:text-gray-300 transition-all duration-150 ease-in-out hover:bg-purple-100 dark:hover:bg-gray-600 rounded-md"
													style={{
														padding: "0.25rem 0.5rem",
														margin: "0.25rem 0.25rem",
													}}
												>
													{dropdownItem}
												</Link>
											))}
										</div>
									)}
								</div>
							))}
						</nav>
					</div>
					{/* 小屏幕按钮 */}
					<Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
						<DrawerTrigger asChild>
							<Button
								variant="ghost"
								className="hover:bg-purple-100 md:hidden"
								size="icon"
							>
								<Icon
									icon="mingcute:menu-fill"
									className="w-5 h-5 text-gray-700 dark:text-yellow-500"
								/>
							</Button>
						</DrawerTrigger>
						<DrawerContent className="flex flex-col justify-center items-center">
							<DrawerHeader>
								<DrawerTitle>{AggregationData.seo.title}</DrawerTitle>
								<DrawerDescription>选择导航链接</DrawerDescription>
							</DrawerHeader>
							<div className="flex flex-col space-y-2">
								{NavLinks.map((item) => (
									<Link
										key={item.name}
										href={item.href}
										className="text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-purple-100 dark:hover:bg-gray-600"
									>
										{item.name}
									</Link>
								))}
							</div>
							<DrawerFooter>
								<DrawerClose>
									<Button variant="outline">关闭</Button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</div>
			</div>
		</header>
	);
};

export default NavigationTop;
