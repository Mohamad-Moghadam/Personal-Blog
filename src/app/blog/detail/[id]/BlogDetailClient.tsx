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
				const url = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/detail/${postId}/`;
				console.log("Fetching:", url);

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

	if (loading) return <p className="p-6">Loading…</p>;
	if (!post) return <p className="p-6 text-red-500">Post not found.</p>;

	return (
		<div className="max-w-3xl mx-auto p-6 space-y-4">
			<h1 className="text-4xl font-bold">{post.title}</h1>

			<p className="text-gray-500">
				Posted on {new Date(post.created_at).toLocaleDateString()} • Status:{" "}
				{post.status}
			</p>

			<p className="text-lg leading-relaxed">{post.content}</p>

			<div className="text-sm text-gray-600">
				Author ID: {post.author ?? "Unknown"}
			</div>
		</div>
	);
}
