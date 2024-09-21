import type { CategoryModel } from "@mx-space/api-client";
import type { AggregateRoot } from "@mx-space/api-client";

declare global {
	export interface AppThemeConfig {
		config: AppConfig;
		footer: FooterConfig;
	}

	export interface BlogItem {
		id: string;
		category: CategoryModel;
		created: string;
		modified: string | null;
		title: string;
		text: string;
		url: string;
		summary: string | null | undefined;
		cover: string;
		tags: string[] | null;
	}
	export type AggregationData = AggregateRoot & {
		theme: AppThemeConfig;
	};
}

export {};
