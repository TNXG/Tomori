"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/react";
import Link from "next/link";

import { SocialLinkConfig } from "@/config";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

interface NavigationRightProps {
	AggregationData: AggregationData;
}

const NavigationRight = ({ AggregationData }: NavigationRightProps) => {
	return (
		<aside className="lg:w-1/6 lg:sticky lg:top-24 lg:self-start">
			<motion.div
				initial={{ opacity: 0, x: -50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5 }}
				className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6"
			>
				<div className="text-center relative">
					<Link href="/about" className="block relative group">
						<Avatar className="w-32 h-32 mx-auto mb-4 relative">
							<AvatarImage
								src={AggregationData.user.avatar}
								alt="Profile_Picture"
							/>
							<AvatarFallback>{AggregationData.user.name}</AvatarFallback>
							<motion.div
								initial={{ opacity: 0 }}
								whileHover={{ opacity: 1 }}
								transition={{ duration: 0.3 }}
								className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full"
							>
								<Icon
									icon="mdi:card-account-details-outline"
									className="h-10 w-10 text-white dark:text-yellow-500"
								/>
							</motion.div>
						</Avatar>
					</Link>
					<h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-orange-500 dark:to-yellow-500">
						{AggregationData.user.name}
					</h1>
					<p className="text-gray-600 dark:text-gray-300 mt-2">
						{AggregationData.user.introduce}
					</p>
				</div>

				<div className="flex justify-center space-x-4">
					{SocialLinkConfig.map((link) => (
						<motion.div
							key={link.name}
							whileHover={{ scale: 1.1 }}
							transition={{ duration: 0.3 }}
						>
							<Button variant="ghost" size="icon" asChild>
								<Link href={link.link} target="_blank" rel="noopener noreferrer">
									<Icon
										icon={link.icon}
										className="h-5 w-5 text-gray-800 dark:text-orange-500"
									/>
									<span className="sr-only">{link.name}</span>
								</Link>
							</Button>
						</motion.div>
					))}
				</div>
				<div className="flex justify-center mt-4 md:mt-0">
					<ThemeSwitcher />
				</div>
			</motion.div>
		</aside>
	);
};

export default NavigationRight;
