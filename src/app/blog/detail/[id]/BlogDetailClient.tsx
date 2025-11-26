"use client";

import { useEffect, useState } from "react";
import { Post } from "@/app/blog/types/Post";

interface Props {
	postId: string;
}

export default function BlogDetailClient({ postId }: Props) {
	const [post, setPost] = useState<Post | null>(null);
	const [loading, setLoading] = useState(true);

	console.log("🟨 Client received postId:", postId);

	useEffect(() => {
		const fetchPost = async () => {
			const url = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/detail/${postId}/`;
			console.log("🟥 Fetching URL:", url);

			try {
				const res = await fetch(url);
				console.log("🟧 Response status:", res.status);

				if (!res.ok) throw new Error("Post not found");

				const data = await res.json();
				console.log("🟦 Received data:", data);

				setPost(data);
			} catch (err) {
				console.error("❌ Error fetching post:", err);
				setPost(null);
			} finally {
				setLoading(false);
			}
		};

		fetchPost();
	}, [postId]);

	if (loading) return <p>Loading...</p>;
	if (!post) return <p>Post not found</p>;

	return <div>{post.title}</div>;
}
