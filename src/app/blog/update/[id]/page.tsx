"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Post {
	id: number;
	title: string;
	content: string;
}

interface Props {
	params: {
		id: string;
	};
}

export default function UpdatePostPage({ params }: Props) {
	const postId = params.id;
	const [post, setPost] = useState<Post | null>(null);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const fetchPost = async () => {
			const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
			try {
				const res = await fetch(`${BASE_URL}/Blog/detail/${postId}/`);
				const data = await res.json();
				setPost(data);
				setTitle(data.title);
				setContent(data.content);
			} catch {
				toast.error("Failed to load post");
			} finally {
				setLoading(false);
			}
		};
		fetchPost();
	}, [postId]);

	const handleUpdate = async () => {
		const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
		const token =
			typeof window !== "undefined" ? localStorage.getItem("token") : null;

		try {
			const res = await fetch(`${BASE_URL}/Blog/update/${postId}/`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ title, content }),
			});

			if (!res.ok) throw new Error("Update failed");

			toast.success("Post updated!");
			router.push("/blog/my-posts");
		} catch {
			toast.error("Failed to update post");
		}
	};

	if (loading) return <p className="p-6 text-gray-300">Loading…</p>;
	if (!post) return <p className="p-6 text-red-500">Post not found.</p>;

	return (
		<div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12 px-4">
			<div className="w-full max-w-3xl bg-gray-800 p-6 rounded-2xl shadow-lg space-y-4">
				<h1 className="text-3xl font-bold text-yellow-400">Update Post</h1>

				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
					placeholder="Post Title"
				/>

				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none h-60 resize-none"
					placeholder="Post Content"
				/>

				<button
					onClick={handleUpdate}
					className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
				>
					Update Post
				</button>
			</div>
		</div>
	);
}
