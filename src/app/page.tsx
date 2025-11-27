"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import VisitorCounter from "./components/VisitorCounter";

interface NewsItem {
	title: string;
	link: string;
	image_url?: string;
}

export default function Home() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [news, setNews] = useState<NewsItem[]>([]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		setIsLoggedIn(!!token);

		if (token) {
			const fetchNews = async () => {
				const apiKey = process.env.NEXT_PUBLIC_NEWSDATA_API_KEY;
				const res = await fetch(
					`https://newsdata.io/api/1/latest?apikey=${apiKey}&q=technology`
				);
				const json = await res.json();
				setNews(json.results || []);
			};
			fetchNews();
		}
	}, []);

	const categories = [
		"Programming/ Code",
		"Learning/ Tutorials",
		"Life/ Personal",
		"Travel/ Places",
		"AI/ Tech",
		"Tips/ Productivity",
		"Random, Misc",
	];

	const tags = [
		"Python",
		"JavaScript",
		"Next.js",
		"React",
		"Django",
		"AI",
		"Machine Learning",
	];

	return (
		<div className="flex flex-col md:flex-row min-h-screen items-start justify-center bg-zinc-50 dark:bg-black font-sans p-4 md:p-8 md:space-x-12">
			<section className="flex flex-col items-center mb-6 md:mb-0 md:w-1/3">
				<div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64">
					<Image
						src="/1000109885.jpg"
						alt="Profile Image"
						fill
						className="rounded-full object-cover shadow-lg"
					/>
				</div>
				<VisitorCounter />
			</section>

			<main className="max-w-3xl w-full md:w-2/3 space-y-8">
				<section className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
					<h1 className="text-3xl font-bold mb-2">Welcome to My Blog!</h1>
					<p className="text-gray-800 dark:text-gray-200">
						Hello World! I’m Mohammad Reza. I build things, I automate things,
						and I learn something new every day. from coding to DevOps. Here,
						you’ll find my journey: the wins, the slip-ups, and the discoveries.
						And this space isn’t just mine — you can share your thoughts and
						stories too. If you’re into learning, creating, and leveling up,
						welcome aboard. Let’s write the next chapter together.
					</p>
				</section>

				<section className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
					<h2 className="text-2xl font-bold mb-2">Categories</h2>
					<div className="flex flex-wrap gap-2 mb-4">
						{categories.map((cat) => (
							<span
								key={cat}
								className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-600 transition"
							>
								{cat}
							</span>
						))}
					</div>

					<h2 className="text-2xl font-bold mb-2">Tags</h2>
					<div className="flex flex-wrap gap-2">
						{tags.map((tag) => (
							<span
								key={tag}
								className="bg-green-500 text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-green-600 transition"
							>
								{tag}
							</span>
						))}
					</div>
				</section>

				<section>
					<h2 className="text-2xl font-bold mb-2">Short Intro</h2>
					<p className="text-gray-700 dark:text-gray-300">
						A backend developer on a full-stack adventure, after an unexpected
						plot twist where I used to teach English. Now I’m diving into code,
						APIs, databases, frontend, deployment… and yes, the occasional
						mini-disaster. Here's where I share what I learn, what I build, and
						what sometimes goes wrong in the way. Learning should be fun,
						honest, and shared, which is why this isn’t just my space. If you’re
						into tech, growth, or posting your own experiments and chaos, you’re
						in the right place. Let’s learn (and laugh) together.
					</p>
				</section>

				{!isLoggedIn && (
					<section className="bg-green-500 dark:bg-green-700 p-6 rounded-lg text-center text-white">
						<h2 className="text-2xl font-bold mb-4">Join My Newsletter!</h2>
						<p className="mb-4">
							Get the latest tips, tutorials, and updates delivered straight to
							your inbox.
						</p>
						<Link href="/signup">
							<button className="bg-white text-green-600 font-bold px-6 py-2 rounded hover:bg-gray-200 transition">
								Subscribe Now
							</button>
						</Link>
					</section>
				)}

				{isLoggedIn && news.length > 0 && (
					<section
						className="w-full bg-gray-200 dark:bg-gray-900 p-4 rounded-lg overflow-hidden relative"
						style={{ height: "160px" }}
					>
						<div className="flex animate-marquee items-center h-full space-x-6">
							{news.map((item, idx) => (
								<a
									key={idx}
									href={item.link}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center space-x-4 min-w-max h-full transition-transform transform hover:scale-105"
								>
									{item.image_url && (
										<div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
											<Image
												src={item.image_url}
												alt={item.title}
												fill
												style={{ objectFit: "cover" }}
												priority
											/>
										</div>
									)}
									<p className="text-blue-600 dark:text-blue-400 font-medium whitespace-nowrap">
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
					</section>
				)}
			</main>
		</div>
	);
}
