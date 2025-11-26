"use client";

import { useEffect, useState } from "react";
import { Post } from "@/app/blog/types/Post";

interface Props {
	postId: string;
}

export default function BlogDetailClient({ postId }: Props) {
	const [post, setPost] = useState<Post | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPost = async () => {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/Blog/detail/${postId}/`
			);
			if (res.ok) {
				const data = await res.json();
				setPost(data);
			}
			setLoading(false);
		};
		fetchPost();
	}, [postId]);

	if (loading) return <p>Loading...</p>;
	if (!post) return <p className="text-red-500">Post not found</p>;

	return (
		<div className="p-6 max-w-3xl mx-auto">
			<h1 className="text-3xl font-bold mb-2">{post.title}</h1>
			<p className="text-gray-500 mb-4">
				{new Date(post.created_at).toLocaleDateString()}
			</p>
			<p className="text-gray-800">{post.content}</p>
		</div>
	);
}
