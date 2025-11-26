// src/app/blog/[id]/BlogDetailClient.tsx
"use client";

import { useEffect, useState } from "react";

export interface Post {
	id: number;
	title: string;
	content: string;
	created_at: string;
	updated_at: string;
	author: string;
	status: string;
}

interface Props {
	postId: string;
}

export default function BlogDetailClient({ postId }: Props) {
	const [post, setPost] = useState<Post | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_BASE_URL}/blog/detail/${postId}/`
				);
				if (!res.ok) throw new Error("Post not found");
				const data: Post = await res.json();
				setPost(data);
			} catch {
				setPost(null);
			} finally {
				setLoading(false);
			}
		};
		fetchPost();
	}, [postId]);

	if (loading) return <p className="p-6">Loading...</p>;
	if (!post) return <p className="p-6 text-red-500">Post not found.</p>;

	return (
		<div className="max-w-3xl mx-auto p-6 space-y-4">
			<h1 className="text-4xl font-bold">{post.title}</h1>
			<p className="text-gray-500">
				{new Date(post.created_at).toLocaleDateString()} by {post.author}
			</p>
			<p className="text-lg leading-relaxed text-gray-800">{post.content}</p>
			<p className="text-sm text-gray-400">Status: {post.status}</p>
		</div>
	);
}
