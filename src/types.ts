import type { CategoryModel } from "@mx-space/api-client";

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