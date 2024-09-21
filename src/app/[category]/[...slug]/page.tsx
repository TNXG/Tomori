import { NextPage } from "next";

interface Params {
	category: string;
	slug: string | string[];
}

const ArticlesPage: NextPage<{ params: Params }> = ({ params }) => {
	const { category, slug } = params;

	const slugArray = Array.isArray(slug) ? slug : [slug];

	const data = {
		category,
		slug: slugArray,
		content: "This is a dynamic page content",
	};

	return (
		<div>
			<h1>Category: {category}</h1>
			<h2>Slug: {slugArray.join("/")}</h2>
			<div>{JSON.stringify(data)}</div>
		</div>
	);
};

export default ArticlesPage;
