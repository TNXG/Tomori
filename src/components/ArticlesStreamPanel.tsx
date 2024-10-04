"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { calculateReadingTime } from "@/lib/utils";

export default function ArticlesStreamPanel({
	articles,
}: {
	articles: BlogItem[];
}) {
	const [searchQuery] = useState("");
	const [hoveredCard, setHoveredCard] = useState<string | null>(null);

	const filteredArticles = articles.filter(
		(article) =>
			article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			article.category.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5, delay: 0.2 }}
			className="space-y-6"
		>
			{filteredArticles.map((article, index) => (
				<motion.article
					key={article.id}
					initial={{ opacity: 0, y: 15 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: index * 0.1 }}
					onMouseEnter={() => setHoveredCard(article.id)}
					onMouseLeave={() => setHoveredCard(null)}
					whileHover={{
						y: -5,
						boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
					}}
				>
					<Link href={article.url} className="block">
						<div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col sm:flex-row transition-all duration-300 ease-in-out hover:shadow-xl hover:bg-pink-50 dark:hover:bg-gray-700">
							{article.cover && (
								<motion.div
									className="relative w-full h-48 sm:w-80 sm:h-auto flex-shrink-0 order-first sm:order-last"
									style={{
										opacity: hoveredCard === article.id ? 1 : 0.8,
									}}
									animate={{
										opacity: hoveredCard === article.id ? 1 : 0.8,
									}}
									transition={{ opacity: { duration: 0.3 } }}
								>
									<motion.img
										src={article.cover}
										alt={article.title}
										className="absolute top-0 right-0 h-full m-0 object-cover hidden lg:block"
										style={{
											width: "min(320px, 50%)",
											mask: "linear-gradient(to right, transparent, #fff 50%)",
										}}
									/>
									<motion.img
										src={article.cover}
										alt={article.title}
										className="h-full w-full object-cover lg:hidden sm:block bg-cover bg-no-repeat bg-center"
										style={{ width: "100%", height: "100%" }}
									/>
								</motion.div>
							)}
							<div className="flex-1 p-6 sm:pr-0">
								<div className="flex justify-between items-center">
									<span className="text-sm font-semibold text-pink-600 dark:text-orange-500">
										{article.category && article.category.name
											? article.category.name
											: ""}
										{article.category &&
										article.category.name &&
										article.tags &&
										article.tags.length > 0
											? " | "
											: ""}
										{article.tags && article.tags.length > 0
											? article.tags.join(", ")
											: ""}
									</span>
								</div>

								<h2 className="text-xl font-bold mt-2 mb-2 text-gray-800 dark:text-gray-100">
									{article.title}
								</h2>

								<p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
									{article.summary || `${article.text.substring(0, 100)}...`}
								</p>

								<div className="text-xs text-gray-500 dark:text-gray-400 mt-4">
									<span>
										发布时间: {dayjs(article.created).format("YYYY-MM-DD")}
									</span>{" "}
									<span> 字数: {article.text.length}</span> |
									<span>
										{" "}
										预计阅读时间: {calculateReadingTime(article.text)}
									</span>{" "}
									{article.modified && (
										<>
											|
											<span>
												{" "}
												修改时间: {dayjs(article.modified).format("YYYY-MM-DD")}
											</span>
										</>
									)}
								</div>
							</div>
						</div>
					</Link>
				</motion.article>
			))}
		</motion.div>
	);
}
