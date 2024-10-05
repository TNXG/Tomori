"use client";

import React, { useEffect, useCallback } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import NavigationTop from "@/components/navigation/NavigationTop";
import NavigationRight from "@/components/navigation/NavigationRight";
import Footer from "@/components/Footer";
import ArticlesMeta from "@/components/articles/ArticlesMeta";
import ArticlesFooter from "@/components/articles/ArticlesFooter";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface Params {
	AggregationData: AggregationData;
	PostData: PostModel;
	Content: string;
}

const ArticlesPage = ({ AggregationData, PostData, Content }: Params) => {
	const router = useRouter();
	const { toast } = useToast();

	const handleBackClick = () => {
		router.back();
	};

	const purePost = JSON.parse(JSON.stringify(PostData));

	const clickCopy = useCallback(
		(content: string): void => {
			navigator.clipboard
				.writeText(content)
				.then(() => {
					toast({
						title: "复制成功",
						description:
							"已将内容复制到剪贴板，请尊重作者劳动成果，转载请遵守授权协议",
					});
				})
				.catch((err) => {
					console.error("复制失败:", err);
					toast({
						title: "复制失败",
						description: "无法复制内容到剪贴板，请重试",
						variant: "destructive",
					});
				});
		},
		[toast],
	);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const button = event.target as HTMLButtonElement;
			if (button.hasAttribute("data-code-content")) {
				const codeContent = button.getAttribute("data-code-content");
				if (codeContent) {
					clickCopy(codeContent);
				}
			}
		};

		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, [clickCopy]);

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

							<div
								id="Article_main"
								dangerouslySetInnerHTML={{ __html: Content }}
							></div>
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
