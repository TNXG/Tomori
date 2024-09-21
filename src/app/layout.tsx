import type { Metadata } from "next";
import "./globals.css";

import { fetchAggregationData } from "@/config";

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
			<body>{children}</body>
		</html>
	);
}
