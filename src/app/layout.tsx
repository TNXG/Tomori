import type { Metadata } from "next";
import "./globals.css";

import { fetchAggregationData } from "@/config";
import { ThemeProvider } from "next-themes";

const AggregationData = await fetchAggregationData();

export const metadata: Metadata = {
	title: AggregationData.seo.title,
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
			<head>
				<link
					rel="stylesheet"
					href="https://cdn.tnxg.top/fonts/MiSansVF_Regular.css"
				/>
			</head>
			<body>
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
}
