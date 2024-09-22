import { NextPage } from "next";
import Articles from "@/layouts/Articles";

interface Params {
	category: string;
	slug: string;
}

const ArticlesPage: NextPage<{ params: Params }> = ({ params }) => {
	const { category, slug } = params;

	return <Articles category={category} slug={slug} />;
};

export default ArticlesPage;
