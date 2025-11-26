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
		<div className="p-8 max-w-5xl mx-auto space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">Blog</h1>

				{token && (
					<Link
						href="/blog/create"
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
					>
						Create New Post
					</Link>
				)}
			</div>

			<BlogList posts={posts} />
		</div>
	);
}
