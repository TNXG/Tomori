import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// 创建一个支持 Markdown 渲染的组件
const MarkdownRender = ({ content }: { content: string }) => {
	return (
		<Markdown
			remarkPlugins={[remarkGfm, remarkMath]}
			rehypePlugins={[rehypeKatex]}
		>
			{content}
		</Markdown>
	);
};
export default MarkdownRender;
