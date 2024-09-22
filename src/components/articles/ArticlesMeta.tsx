"use client"; // 确保这是一个客户端组件

import dayjs from "dayjs";
import { calculateReadingTime } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Fragment, useState } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { NumberSmoothTransition } from "@/components/ui/NumberSmoothTransition";
import { MotionButtonBase } from "@/components/ui/MotionButton";
import { routeBuilder, Routes } from "@/lib/route-builder";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export const ArticlesMeta = ({ post }: { post: PostModel }) => {
	const router = useRouter();
	const [underlineWidth, setUnderlineWidth] = useState(0);
	const [underlineLeft, setUnderlineLeft] = useState(0);
	const [isHovering, setIsHovering] = useState(false);
	const [tagUnderlineWidth, setTagUnderlineWidth] = useState(0);
	const [tagUnderlineLeft, setTagUnderlineLeft] = useState(0);
	const [isTagHovering, setIsTagHovering] = useState(false);

	const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
		const target = event.currentTarget;
		setUnderlineWidth(target.offsetWidth);
		setUnderlineLeft(target.offsetLeft);
		setIsHovering(true);
	};

	const handleMouseLeave = () => {
		setIsHovering(false);
	};

	const handleTagMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
		const target = event.currentTarget;
		setTagUnderlineWidth(target.offsetWidth);
		setTagUnderlineLeft(target.offsetLeft);
		setIsTagHovering(true);
	};

	const handleTagMouseLeave = () => {
		setIsTagHovering(false);
	};

	return (
		<>
			<h1 className="text-4xl font-extrabold mb-4 text-center">{post.title}</h1>
			<div className="text-sm text-muted-foreground mb-2 text-center">
				<div className="flex items-center justify-center space-x-2">
					{!!post.created && (
						<>
							<Icon icon="mdi:calendar-outline" className="h-4 w-4" />
							<span>{dayjs(post.created).format("YYYY-MM-DD HH:mm")}</span>
						</>
					)}
					{post.modified ? (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>(已编辑)</TooltipTrigger>
								<TooltipContent>
									<p>
										编辑于 {dayjs(post.modified).format("YYYY-MM-DD HH:mm")}
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					) : (
						<span className="text-xs">(已编辑)</span>
					)}
					<span className="mx-2">•</span>
					<span>预计阅读时间: {calculateReadingTime(post.text)}</span>
					{!!post.category && (
						<div className="flex min-w-0 items-center space-x-1">
							<Icon icon="fe-hash" className="translate-y-[0.5px]" />
							<span className="min-w-0 truncate relative">
								<MotionButtonBase
									onClick={() =>
										post.category &&
										router.push(
											routeBuilder(Routes.Category, {
												slug: post.category.slug,
											}),
										)
									}
									onMouseEnter={handleMouseEnter}
									onMouseLeave={handleMouseLeave}
									className="font-normal"
								>
									<span>{post.category?.name}</span>
								</MotionButtonBase>

								<motion.div
									className="absolute left-0 bottom-0 h-[2px] bg-green-300" // 修改为浅草绿色
									style={{
										width: underlineWidth,
										transform: `translateX(${underlineLeft}px)`,
									}}
									initial={{ width: 0 }}
									animate={{ width: isHovering ? underlineWidth : 0 }}
									transition={{ duration: 0.5, ease: "easeInOut" }} // 平滑显示和隐藏
								/>

								{post.tags?.length ? (
									<>
										{" "}
										/{" "}
										{post.tags.map((tag, index) => {
											const isLast = index === post.tags!.length - 1;

											return (
												<Fragment key={tag}>
													<button
														onMouseEnter={handleTagMouseEnter}
														onMouseLeave={handleTagMouseLeave}
													>
														{tag}
													</button>
													{!isLast && <span>, </span>}

													<motion.div
														className="absolute left-0 bottom-0 h-[2px] bg-green-300"
														style={{
															width: tagUnderlineWidth,
															transform: `translateX(${tagUnderlineLeft}px)`,
														}}
														initial={{ width: 0 }}
														animate={{
															width: isTagHovering ? tagUnderlineWidth : 0,
														}}
														transition={{ duration: 0.5, ease: "easeInOut" }} // 设置为更慢的速度
													/>
												</Fragment>
											);
										})}
									</>
								) : (
									""
								)}
							</span>
						</div>
					)}

					{!!post.count?.read && (
						<div className="flex min-w-0 items-center space-x-1">
							<Icon icon="mingcute-eye-2-line" />
							<span className="min-w-0 truncate">
								<NumberSmoothTransition>
									{post.count.read}
								</NumberSmoothTransition>
							</span>
						</div>
					)}
					{!!post.count?.like && (
						<div className="flex min-w-0 items-center space-x-1">
							<Icon icon="mingcute-thumb-up-line" />
							<span className="min-w-0 truncate">
								<NumberSmoothTransition>
									{post.count.like}
								</NumberSmoothTransition>
							</span>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default ArticlesMeta;
