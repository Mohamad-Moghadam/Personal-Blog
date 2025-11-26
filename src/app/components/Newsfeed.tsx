import { getNews } from "@/lib/news";

export default async function NewsBar() {
	interface NewsItem {
		title: string;
		link: string;
		image?: string;
	}

	const news = await getNews();

	if (news.length === 0) return null;

	return (
		<div className="w-full overflow-hidden relative bg-gray-200 dark:bg-gray-900 p-6 rounded-lg">
			<div className="flex animate-marquee space-x-8 items-center">
				{news.map((n: NewsItem, i: number) => (
					<a
						key={i}
						href={n.link}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center space-x-4 min-w-max"
					>
						{n.image && (
							<img
								src={n.image}
								alt={n.title}
								className="h-16 w-16 object-cover rounded"
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
					animation: marquee 90s linear infinite;
				}
				@media (max-width: 768px) {
					.animate-marquee {
						animation: marquee 120s linear infinite;
					}
				}
			`}</style>
		</div>
	);
}
