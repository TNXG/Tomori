import { NextPage } from "next";
import { apiClient } from "@/apiClient";
import { fetchAggregationData } from "@/config";
import type { Metadata } from "next";

import MarkdownRender from "@/components/render/markdown";
import Articles from "@/layouts/Articles";

interface Params {
	pages: string;
}

export const metadata: Metadata = {
	title: "",
};

const Pages: NextPage<{ params: Params }> = async ({ params }) => {
	const { pages } = params;

	const AggregationData = await fetchAggregationData();

	const post = await apiClient().page.getBySlug(pages);

	metadata.title = post.title;

	return (
		<Articles
			AggregationData={JSON.parse(JSON.stringify(AggregationData))}
			PostData={JSON.parse(JSON.stringify(post))}
			Content={await MarkdownRender(post.text)}
		/>
	);
};

export default Pages;
