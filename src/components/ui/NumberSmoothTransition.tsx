"use client";

import { AnimatePresence, m } from "framer-motion";
import type { Spring } from "framer-motion";
import { useEffect, useState } from "react";

export const microDampingPreset: Spring = {
	type: "spring",
	damping: 24,
};
export default function useDebounceValue<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}

export const NumberSmoothTransition = (props: {
	children: string | number;
}) => {
	const { children } = props;
	const debouncedChildren = useDebounceValue(children, 300);
	return (
		<AnimatePresence mode="popLayout" initial={false}>
			<m.span
				key={debouncedChildren}
				initial={{
					opacity: 0,
					y: -16,
				}}
				animate={{
					opacity: 1,
					y: 0,
				}}
				exit={{
					opacity: 0,
					y: -16,
					position: "absolute",
				}}
				transition={microDampingPreset}
			>
				{debouncedChildren}
			</m.span>
		</AnimatePresence>
	);
};
