"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Post = {
	id: number;
	title: string;
	date: string;
	excerpt: string;
};

export default function BlogPage() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await fetch(`${BASE_URL}/Contact/contact`);
				if (!res.ok) {
					throw new Error("Failed to fetch posts");
				}
				const data = await res.json();
				setPosts(data);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, [BASE_URL]);

	if (loading) return <p className="text-center mt-10">Loading...</p>;
	if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

	return (
		<div className="min-h-screen bg-zinc-50 dark:bg-black text-gray-800 dark:text-gray-200 font-sans px-6 py-12">
			<div className="max-w-4xl mx-auto space-y-8">
				<header className="text-center mb-10">
					<h1 className="text-4xl font-bold mb-3">📝 My Blog</h1>
					<p className="text-gray-600 dark:text-gray-400">
						Thoughts, Code, and Everything In Between
					</p>
				</header>

				<div className="space-y-6">
					{posts.map((post) => (
						<article
							key={post.id}
							className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow hover:shadow-lg transition duration-300"
						>
							<h2 className="text-2xl font-bold mb-2">{post.title}</h2>
							<p className="text-sm text-gray-500 mb-3">{post.date}</p>
							<p className="mb-4">{post.excerpt}</p>
							<Link
								href={`/blog/${post.id}`}
								className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
							>
								More
							</Link>
						</article>
					))}
				</div>
			</div>
		</div>
	);
}
