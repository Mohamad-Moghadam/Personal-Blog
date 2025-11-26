"use client";

import { useEffect, useState } from "react";
import { Post } from "@/app/blog/types/Post";

interface Props {
	postId: string;
}

export default function BlogDetailClient({ postId }: Props) {
	const [post, setPost] = useState<Post | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadPost = async () => {
			setLoading(true);
			setError(null);
			try {
				// تبدیل postId به عدد
				const id = Number(postId);
				if (isNaN(id)) throw new Error("Invalid post ID");

				const res = await fetch(
					`${process.env.NEXT_PUBLIC_BASE_URL}/Blog/detail/${id}/`
				);

				if (!res.ok) {
					if (res.status === 404) throw new Error("Post not found");
					throw new Error("Failed to fetch post");
				}

				const data: Post = await res.json();
				setPost(data);
			} catch (err: any) {
				console.error(err);
				setPost(null);
				setError(err.message || "Unknown error");
			} finally {
				setLoading(false);
			}
		};

		loadPost();
	}, [postId]);

	if (loading) return <p className="p-6 text-gray-600">Loading post...</p>;
	if (error) return <p className="p-6 text-red-500">{error}</p>;
	if (!post) return <p className="p-6 text-red-500">Post not found.</p>;

	return (
		<div className="max-w-3xl mx-auto p-6 space-y-4">
			<h1 className="text-4xl font-bold">{post.title}</h1>
			<p className="text-gray-500">
				{new Date(post.created_at).toLocaleDateString()}
			</p>
			<p className="text-lg leading-relaxed text-gray-800">{post.content}</p>
		</div>
	);
}
