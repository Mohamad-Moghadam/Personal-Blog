"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface NewsItem {
	title: string;
	link: string;
	image_url?: string;
}

export default function NewsBar() {
	const [news, setNews] = useState<NewsItem[]>([]);

	useEffect(() => {
		const fetchNews = async () => {
			const apiKey = process.env.NEXT_PUBLIC_NEWSDATA_API_KEY;
			if (!apiKey) {
				console.error("API key is missing!");
				return;
			}

			try {
				const res = await fetch(
					`https://newsdata.io/api/1/latest?apikey=${apiKey}&q=technology`
				);
				const json = await res.json();
				setNews(json.results || []);
			} catch (err) {
				console.error("Failed to fetch news:", err);
			}
		};

		fetchNews();
	}, []);

	if (news.length === 0) return null;

	return (
		<section
			className="w-full overflow-hidden relative bg-gray-200 dark:bg-gray-900 p-4 rounded-lg"
			style={{ height: "220px" }}
		>
			<div className="flex animate-marquee space-x-6 items-stretch h-full">
				{news.map((item, i) => (
					<a
						key={i}
						href={item.link}
						target="_blank"
						rel="noopener noreferrer"
						className="flex flex-col min-w-[180px] bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md"
					>
						{item.image_url ? (
							<Image
								src={item.image_url}
								alt={item.title}
								width={180}
								height={120}
								className="object-cover"
							/>
						) : (
							<div className="w-full h-[120px] bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
								<span className="text-gray-500">No Image</span>
							</div>
						)}
						<div className="p-2 flex-1">
							<p className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2">
								{item.title}
							</p>
						</div>
					</a>
				))}
			</div>

			<style jsx>{`
				@keyframes marquee {
					0% {
						transform: translateX(100%);
					}
					100% {
						transform: translateX(-100%);
					}
				}
				.animate-marquee {
					display: flex;
					align-items: stretch;
					height: 100%;
					animation: marquee 120s linear infinite;
				}
				@media (max-width: 768px) {
					.animate-marquee {
						animation: marquee 180s linear infinite;
					}
				}
			`}</style>
		</section>
	);
}
