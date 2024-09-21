import { apiClient } from "@/apiClient";
import { cache } from "react";

import { simpleCamelcaseKeys } from "@mx-space/api-client";
import { $fetch } from "ofetch";

import { getQueryClient } from "@/lib/query-client.server";

export const appStaticConfig = {
	ai: {
		summary: {
			enabled: true,
		},
	},

	cache: {
		enabled: true,

		ttl: {
			aggregation: 3600,
		},
	},

	revalidate: 1000 * 10, // 10s
};

export const SocialLinkConfig = [
	{
		name: "GitHub",
		link: "https://github.com/TNXG",
		icon: "mingcute:github-line",
	},
	{
		name: "Twitter",
		link: "https://twitter.com/iykrzu",
		icon: "mingcute:twitter-line",
	},
	{
		name: "Telegram",
		link: "https://t.me/iykrzu",
		icon: "mingcute:telegram-line",
	},
	{
		name: "RSS",
		link: "/feed.xml",
		icon: "mingcute:rss-line",
	},
];

export const NavLinksConfig = [
	{ name: "首页", href: "/" },
	{
		name: "归档",
		href: "/archive",
		dropdownItems: ["Anime", "Comics", "Games"],
	},
	{ name: "关于", href: "/about" },
	{ name: "友链", href: "/links" },
	{ name: "留言", href: "/message" },
];

export const MiscellaneousConfig = {
	wordsPerMinute: 200,
};

const cacheTime = appStaticConfig.cache.enabled
	? appStaticConfig.cache.ttl.aggregation
	: 1;

export const fetchAggregationData = cache(
	async (): Promise<AggregationData> => {
		const queryClient = getQueryClient();
		const fetcher = async () =>
			(await $fetch<AggregationData>(apiClient().aggregate.proxy.toString(true), {
				params: {
					theme: "tomori",
				},
				next: {
					revalidate: cacheTime,
					tags: ["aggregate", "tomori"],
				},
			}).then(simpleCamelcaseKeys)) as AggregationData;

		return queryClient.fetchQuery({
			queryKey: ["aggregate", "tomori"],
			queryFn: fetcher,
			staleTime: cacheTime,
			gcTime: cacheTime,
		});
	},
);
