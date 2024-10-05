"use client";

import { startTransition, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useIsClient = () => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);
	return isClient;
};

export const useIsClientTransition = () => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		startTransition(() => {
			setIsClient(true);
		});
	}, []);
	return isClient;
};

// 获取当前URL的函数
export const getCurrentURL = (): string => {
	if (typeof window !== "undefined") {
		return window.location.href;
	}
	return "";
};

// 获取特定域名URL的函数
export const getSpecificDomainURL = (domain: string): string => {
	if (typeof window !== "undefined") {
		const url = new URL(window.location.href);
		url.hostname = domain;
		return url.href;
	}
	return "";
};

// 获取当前URL的协议、域名和端口的函数
export const getProtocolAndDomain = (): string => {
	if (typeof window !== "undefined") {
		const url = new URL(window.location.href);
		return `${url.protocol}//${url.hostname}${url.port ? `:${url.port}` : ""}`;
	}
	return "";
};