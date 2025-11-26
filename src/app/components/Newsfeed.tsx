"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

interface NewsItem {
	title: string;
	link: string;
	image_url?: string;
}

// کامپوننت NewsBar با طراحی تمیز و responsive
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
			className="w-full overflow-hidden relative bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow-md"
			style={{ height: "160px" }}
		>
			<div className="flex animate-marquee items-center space-x-8 h-full">
				{news.map((item, idx) => (
					<a
						key={idx}
						href={item.link}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center min-w-max h-full space-x-4 transition transform hover:scale-105"
					>
						{item.image_url && (
							<div className="flex-shrink-0 w-16 h-16 relative rounded-md overflow-hidden">
								<Image
									src={item.image_url}
									alt={item.title}
									fill
									style={{ objectFit: "cover" }}
									priority={true}
								/>
							</div>
						)}
						<p className="text-blue-700 dark:text-blue-400 font-medium whitespace-nowrap">
							{item.title}
						</p>
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
					animation: marquee 45s linear infinite;
				}

				@media (max-width: 768px) {
					.animate-marquee {
						animation: marquee 45s linear infinite;
					}
				}
			`}</style>
		</div>
	);
}
