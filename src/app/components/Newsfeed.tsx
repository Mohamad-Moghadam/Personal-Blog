"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface NewsItem {
	title: string;
	link: string;
	image_url?: string;
}

// کامپوننت NewsBar که اخبار رو به صورت marquee نشون میده
export default function NewsBar() {
	const [news, setNews] = useState<NewsItem[]>([]);

	useEffect(() => {
		const fetchNews = async () => {
			const apiKey = process.env.NEXT_PUBLIC_NEWSDATA_API_KEY;
			const res = await fetch(
				`https://newsdata.io/api/1/latest?apikey=${apiKey}&q=technology`
			);
			const json = await res.json();
			setNews(json.results || []);
		};
		fetchNews();
	}, []);

	if (news.length === 0) return null;

	return (
		<div
			className="w-full overflow-hidden relative bg-gray-200 dark:bg-gray-900 p-6 rounded-lg"
			style={{ height: "150px" }}
		>
			<div className="flex animate-marquee items-center space-x-6 h-full">
				{news.map((n, i) => (
					<a
						key={i}
						href={n.link}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center space-x-4 min-w-max h-full"
					>
						{n.image_url && (
							<Image
								src={n.image_url}
								alt={n.title}
								width={60}
								height={60}
								className="rounded-md object-cover"
							/>
						)}
						<span className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
							{n.title}
						</span>
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
					align-items: center;
					height: 100%;
					animation: marquee 360s linear infinite;
				}
				@media (max-width: 768px) {
					.animate-marquee {
						animation: marquee 420s linear infinite;
					}
				}
			`}</style>
		</div>
	);
}
