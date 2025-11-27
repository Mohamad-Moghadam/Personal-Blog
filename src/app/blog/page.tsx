"use client";

import { useEffect, useState } from "react";
import { Post } from "./types/Post";
import BlogList from "./components/BlogList";
import Link from "next/link";

export default function BlogPage() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [token, setToken] = useState<string | null>(null);
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

	useEffect(() => {
		setToken(localStorage.getItem("token"));

		const fetchPosts = async () => {
			try {
				const res = await fetch(`${BASE_URL}/Blog/list/`);
				const data: Post[] = await res.json();
				setPosts(data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchPosts();
	}, []);

	return (
		<div className="flex flex-col min-h-screen p-8 max-w-5xl mx-auto">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Blog</h1>

				<div className="flex gap-2">
					{token ? (
						<>
							<Link
								href="/blog/create"
								className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
							>
								Create New Post
							</Link>

							<Link
								href="/blog/my-posts"
								className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
							>
								My Posts
							</Link>
						</>
					) : (
						<Link
							href="/signup"
							className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
						>
							Sign Up to Create
						</Link>
					)}
				</div>
			</div>

			<div className="flex-1 space-y-6">
				<BlogList posts={posts} />
			</div>
		</div>
	);
}
