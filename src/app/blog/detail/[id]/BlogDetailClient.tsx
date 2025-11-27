"use client";

import { useEffect, useState } from "react";

interface Post {
	id: number;
	title: string;
	content: string;
	author: number | null;
	status: string;
	created_at: string;
	updated_at: string;
}

export default function BlogDetailClient({ postId }: { postId: string }) {
	const [post, setPost] = useState<Post | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadPost = async () => {
			try {
				const url = `${process.env.NEXT_PUBLIC_BASE_URL}/Blog/detail/${postId}/`;
				const res = await fetch(url);
				const data = await res.json();
				setPost(data);
			} catch (error) {
				console.error("Error fetching:", error);
				setPost(null);
			} finally {
				setLoading(false);
			}
		};

		loadPost();
	}, [postId]);

	if (loading)
		return (
			<p className="p-6 text-center text-gray-300 animate-pulse">Loading…</p>
		);

	if (!post)
		return (
			<p className="p-6 text-center text-red-500 font-semibold">
				Post not found.
			</p>
		);

	return (
		<div className="max-w-3xl mx-auto p-6 mt-8 bg-gray-900 text-white rounded-2xl shadow-lg transition-transform hover:scale-[1.01]">
			<h1 className="text-4xl font-extrabold text-yellow-400 mb-4">
				{post.title}
			</h1>

			<div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
				<span>
					<strong>Posted:</strong>{" "}
					{new Date(post.created_at).toLocaleDateString()}
				</span>
				<span className="capitalize">
					<strong>Status:</strong> {post.status}
				</span>
				<span>
					<strong>Author:</strong> {post.author ?? "Unknown"}
				</span>
			</div>

			<p className="text-gray-200 text-lg leading-relaxed whitespace-pre-line">
				{post.content}
			</p>
		</div>
	);
}
