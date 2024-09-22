import { fetchAggregationData } from "@/config";
import { postslist } from "@/lib/utils";

import NavigationTop from "@/components/navigation/NavigationTop";
import NavigationRight from "@/components/navigation/NavigationRight";
import ArticlesStreamPanel from "@/components/ArticlesStreamPanel";
import Footer from "@/components/Footer";

let articles: BlogItem[];
let AggregationData: AggregationData;
const HomePage = async () => {
	try {
		articles = await postslist();
		AggregationData = await fetchAggregationData();
	} catch (error) {
		console.error("Failed to fetch articles:", error);
	}
	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
			<NavigationTop AggregationData={AggregationData} />
			<div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
				<NavigationRight AggregationData={AggregationData} />
				<main className="lg:w-3/4 space-y-8">
					{/* 将 articles 传递给 ArticlesStreamPanel 组件 */}
					<ArticlesStreamPanel articles={articles} />
				</main>
			</div>
			<Footer AggregationData={AggregationData} />
			<br />
		</div>
	);
};

export default HomePage;
