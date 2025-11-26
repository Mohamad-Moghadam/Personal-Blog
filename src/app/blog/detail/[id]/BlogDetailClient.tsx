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
			} catch {
				setPost(null);
			} finally {
				setLoading(false);
			}
		};

		loadPost();
	}, [postId]);

	if (loading)
		return (
			<div className="p-6 text-center text-gray-500 text-lg animate-pulse">
				Loading…
			</div>
		);

	if (!post)
		return (
			<div className="p-6 text-center text-red-600 text-lg font-semibold">
				Post not found.
			</div>
		);

	return (
		<div className="max-w-4xl mx-auto p-6 space-y-6 bg-white shadow-lg rounded-xl">
			<h1 className="text-4xl font-extrabold text-gray-900">{post.title}</h1>

			<div className="flex flex-wrap gap-4 text-sm text-gray-500">
				<span>Posted: {new Date(post.created_at).toLocaleDateString()}</span>
				<span>Status: {post.status}</span>
				<span>Author: {post.author ?? "Unknown"}</span>
			</div>

			<p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
				{post.content}
			</p>
		</div>
	);
}
