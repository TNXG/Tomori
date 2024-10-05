import type { Metadata } from "next";
import "./globals.css";

import { fetchAggregationData } from "@/config";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";

const AggregationData = await fetchAggregationData();

export const metadata: Metadata = {
	title: {
		template: `%s - ${AggregationData.seo.title}`,
		default: AggregationData.seo.title,
	},
	description: AggregationData.seo.description,
	keywords: AggregationData.seo.keywords,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="zh-cn">
			<body className="font-sans zoom-in-110">
				<ThemeProvider>
					<main>{children}</main>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
