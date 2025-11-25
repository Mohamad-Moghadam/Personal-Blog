"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface BlogPost {
	id: number;
	title: string;
	date: string;
	excerpt: string;
}

export default function DashboardSidebar({ token }: { token: string | null }) {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

	useEffect(() => {
		if (!token) return; // only fetch if logged in

		const fetchPosts = async () => {
			try {
				const res = await fetch(`${BASE_URL}/Blog/list/`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (!res.ok) throw new Error("Failed to fetch posts");
				const data: BlogPost[] = await res.json();
				setPosts(data);
			} catch (err) {
				setPosts([]);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, [token]);

	if (!token) {
		return null; // don't show dashboard if not logged in
	}

	const handleDelete = async (id: number) => {
		if (!confirm("Are you sure you want to delete this post?")) return;

		try {
			const res = await fetch(`${BASE_URL}/Blog/delete/${id}/`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (res.ok) setPosts(posts.filter((p) => p.id !== id));
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<aside className="w-80 bg-zinc-100 dark:bg-zinc-900 p-6 rounded-xl space-y-6">
			<h2 className="text-2xl font-bold mb-4">Dashboard</h2>

			<Link
				href="/blog/create"
				className="block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
			>
				Create New Post
			</Link>

			<h3 className="text-xl font-semibold mt-6">Your Posts</h3>

			{loading ? (
				<p>Loading...</p>
			) : posts.length === 0 ? (
				<p>No posts yet.</p>
			) : (
				<ul className="space-y-2">
					{posts.map((post) => (
						<li key={post.id} className="flex justify-between items-center">
							<Link
								href={`/blog/${post.id}`}
								className="text-blue-600 dark:text-blue-400 hover:underline"
							>
								{post.title}
							</Link>
							<button
								onClick={() => handleDelete(post.id)}
								className="text-red-600 hover:underline"
							>
								Delete
							</button>
						</li>
					))}
				</ul>
			)}
		</aside>
	);
}
