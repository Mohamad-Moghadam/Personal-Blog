"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		setIsLoggedIn(!!token);
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
		<div className="flex flex-col md:flex-row min-h-screen items-start justify-center bg-zinc-50 dark:bg-black font-sans p-8 md:space-x-12">
			<section className="flex-shrink-0 mb-6 md:mb-0 md:w-1/3 flex justify-center">
				<Image
					src="/1000109885.jpg"
					alt="Profile Image"
					width={350}
					height={350}
					className="rounded-full object-cover shadow-lg"
				/>
			</section>

			<main className="max-w-3xl w-full md:w-2/3 space-y-8">
				<section className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
					<h1 className="text-3xl font-bold mb-2">Welcome to My Blog!</h1>
					<p className="text-gray-800 dark:text-gray-200">
						Hey there! I’m Mohammad Reza — a developer who loves learning new
						things. This is where I write about my journey — from backend to
						frontend, from ideas to mistakes. If you’re into real learning (and
						a few hiccups along the way), welcome aboard!
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
						I’m Mohammad Reza — a backend developer on a full-stack journey.
						After teaching English for a while, I decided to dive deeper into
						the world of code — from APIs and databases to frontend and
						deployment. This blog is where I share what I learn, what I build,
						and sometimes what completely breaks along the way 😅 I believe
						learning should be fun, honest, and shared — so if you’re curious
						about tech, growth, and the messy process of figuring things out,
						you’re in the right place.
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
			</main>
		</div>
	);
}