"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { Icon } from "@iconify/react";
import { QRCodeSVG } from "qrcode.react"; // 引入二维码生成库

export const ArticlesFooter = ({
	post,
	AggregationData,
}: {
	post: PostModel;
	AggregationData: AggregationData;
}) => {
	const [isQRCodeExpanded, setIsQRCodeExpanded] = useState(false);
	const [link, setLink] = useState<string | null>(null); // 用于存储页面链接
	const qrcodeContainerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		// 确保只在客户端运行
		if (typeof window !== "undefined") {
			setLink(window.location.href); // 通过 `window` 获取当前页面的链接
		}
	}, []);

	// 复制链接到剪贴板
	const handleCopyLink = () => {
		if (link) {
			navigator.clipboard.writeText(link);
		}
	};

	// 切换二维码显示状态
	const toggleQRCode = () => {
		setIsQRCodeExpanded(!isQRCodeExpanded);
	};

	// 分享到微博
	const handleShareWeibo = () => {
		if (link) {
			const shareUrl = `http://service.weibo.com/share/share.php?url=${link}&title=${document.title}&pic=https://cravatar.cn/avatar/1ffe42aa45a6b1444a786b1f32dfa8aa?s=400`;
			window.open(shareUrl, "_blank");
		}
	};

	return (
		<div
			className={cn(
				"relative flex flex-col gap-y-2 rounded-xl border px-3 sm:px-4 py-2 sm:py-3 Satoshi",
			)}
		>
			<Icon
				icon="mingcute-copyright-line"
				className="absolute end-4 top-4 size-20 opacity-10"
			/>

			{/* 标题和链接 */}
			<div className="flex flex-col">
				<div className="text-foreground">{post.title}</div>
				<div className="text-sm">{link}</div>
			</div>

			{/* 文章信息 */}
			<div className="flex flex-row flex-wrap justify-start gap-x-5 gap-y-1 sm:gap-x-8">
				<div className="flex gap-x-2 sm:flex-col">
					<span className="text-foreground">Author</span>
					<span className="text-sm max-sm:place-self-center">
						{AggregationData.user.name}
					</span>
				</div>
				<div className="flex gap-x-2 sm:min-w-16 sm:flex-col">
					<span className="text-foreground">Update date</span>
					<span className="text-sm max-sm:place-self-center">
						{dayjs(post.modified ? post.modified : post.created).format(
							"YYYY-MM-DD",
						)}
					</span>
				</div>
				<div className="flex gap-x-2 sm:flex-col">
					<span className="text-foreground">Copyright</span>
					<a
						className="text-sm text-muted-foreground max-sm:place-self-center"
						href="https://creativecommons.org/licenses/by/4.0/"
						target="_blank"
						rel="noopener noreferrer"
					>
						CC BY-NC-SA 4.0
					</a>
				</div>
			</div>

			{/* 功能按钮 */}
			<div className="relative">
				<div className="flex flex-row gap-3">
					{[
						{
							id: "copy-link",
							icon: "mingcute-link-2-line",
							onClick: handleCopyLink,
						},
						{
							id: "get-qrcode",
							icon: "mingcute-qrcode-2-line",
							onClick: toggleQRCode,
						},
						{
							id: "share-weibo",
							icon: "mingcute-weibo-line",
							onClick: handleShareWeibo,
						},
					].map(({ id, icon, onClick }) => (
						<button
							key={id}
							id={id}
							className="group rounded-full bg-primary-foreground p-1 text-muted-foreground transition-colors hover:text-primary sm:p-1.5"
							onClick={onClick}
						>
							<Icon icon={icon} />
						</button>
					))}
				</div>

				{/* 显示二维码 */}
				{isQRCodeExpanded && link && (
					<div
						id="qrcode"
						ref={qrcodeContainerRef}
						className={cn(
							"absolute z-10 -mt-2 box-content rounded-xl border bg-primary-foreground p-4",
						)}
					>
						<QRCodeSVG value={link} size={128} />
					</div>
				)}
			</div>

			<div className="mx-6 rounded-b-xl border border-t-0 px-3 pb-1.5 pt-1 sm:mx-8 sm:px-4">
				<a
					href="/donate"
					className="flex justify-between text-muted-foreground no-underline"
					target="_blank"
					rel="noopener noreferrer"
				>
					<div>Buy me a cup of coffee ☕.</div>
					<Icon icon="mingcute-receive-money-line" className="m-1 size-5" />
				</a>
			</div>
		</div>
	);
};

export default ArticlesFooter;
