"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import NavigationTop from "@/components/navigation/NavigationTop";
import NavigationRight from "@/components/navigation/NavigationRight";
import MarkdownRender from "@/components/render/markdown";
import Footer from "@/components/Footer";
import ArticlesMeta from "@/components/articles/ArticlesMeta";
import ArticlesFooter from "@/components/articles/ArticlesFooter";
import { useRouter } from "next/navigation";

interface Params {
	AggregationData: AggregationData;
	PostData: PostModel;
}

const ArticlesPage = ({ AggregationData, PostData }: Params) => {
	const router = useRouter(); // 直接调用 useRouter

	const handleBackClick = () => {
		router.back();
	};

	const purePost = JSON.parse(JSON.stringify(PostData));

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
			<NavigationTop AggregationData={AggregationData} />
			<div className="container mx-auto px-4 py-8 lg:px-6 flex flex-col lg:flex-row gap-8">
				<NavigationRight AggregationData={AggregationData} />
				<main className="lg:w-3/4 space-y-8">
					<div className="prose dark:prose-dark max-w-none bg-white dark:bg-gray-800 rounded-lg p-4">
						<Button
							variant="outline"
							className="mb-4 bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-150 mt-5 ml-5"
							onClick={handleBackClick}
						>
							<Icon icon="mingcute:arrow-left-line" className="mr-2 h-4 w-4" />
							Back to Articles
						</Button>
						<article className="px-10">
							<ArticlesMeta post={purePost} />
							{PostData.summary && (
								<Card className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 dark:border-gray-600">
									<div className="flex items-center">
										<Icon
											icon="mdi:sparkles"
											className="h-5 w-5 text-yellow-500 mr-3"
										/>
										<h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
											Summary
										</h3>
									</div>
									<div className="divider mb-4"></div>
									<p className="text-sm text-gray-600 dark:text-gray-300">
										{PostData.summary}
									</p>
								</Card>
							)}

							<MarkdownRender content={PostData.text} />
							<div className="divider mb-4"></div>
							<ArticlesFooter
								post={purePost}
								AggregationData={AggregationData}
							/>
							<div className="divider mb-4"></div>
							{/* to do comment */}
						</article>
					</div>
				</main>
			</div>
			<Footer AggregationData={AggregationData} />
			<br />
		</div>
	);
};

export default ArticlesPage;
