import { NextPage } from "next";
import { fetchAggregationData } from "@/config";
import { apiClient } from "@/apiClient";
import type { Metadata } from "next";

import Articles from "@/layouts/Articles";
interface Params {
	category: string;
	slug: string;
}

export const metadata: Metadata = {
	title: "",
};

const ArticlesPage: NextPage<{ params: Params }> = async ({ params }) => {
	const { category, slug } = params;

	const AggregationData = await fetchAggregationData();
	const post = await apiClient().post.getPost(category, slug);

	metadata.title = `${post.title} - ${AggregationData.seo.title}`;

	return (
		<Articles
			AggregationData={JSON.parse(JSON.stringify(AggregationData))}
			PostData={JSON.parse(JSON.stringify(post))}
		/>
	);
};

export default ArticlesPage;
