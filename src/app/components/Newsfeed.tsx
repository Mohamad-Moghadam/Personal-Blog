import { getNews } from "@/lib/news";

export default async function NewsBar() {
	const news = await getNews();

	if (news.length === 0) return null;

	return (
		<div className="overflow-hidden relative bg-gray-200 dark:bg-gray-900 p-4 rounded-lg">
			<div className="whitespace-nowrap animate-marquee">
				{news.map((n, i) => (
					<a
						key={i}
						href={n.link}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block mx-6 text-blue-600 dark:text-blue-400 font-medium hover:underline"
					>
						{n.title}
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
					display: inline-block;
					animation: marquee 30s linear infinite;
				}
			`}</style>
		</div>
	);
}
