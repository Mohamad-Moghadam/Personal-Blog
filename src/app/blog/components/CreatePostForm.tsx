"use client";

import { useState } from "react";
import { Post } from "../types/Post";
import toast from "react-hot-toast";

interface Props {
	token: string;
	onCreate: (p: Post) => void;
}

export default function CreatePostForm({ token, onCreate }: Props) {
	const [title, setTitle] = useState("");
	const [excerpt, setExcerpt] = useState("");
	const [loading, setLoading] = useState(false);
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await fetch(`${BASE_URL}/Blog/create/`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title, content: excerpt, status: "published" }),
			});

			if (!res.ok) throw new Error("Failed to create post");

			const newPost: Post = await res.json();
			onCreate(newPost);
			setTitle("");
			setExcerpt("");
			toast.success("Post created successfully!");
		} catch (err) {
			console.error(err);
			toast.error("Error creating post!");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className="space-y-3" onSubmit={handleSubmit}>
			<input
				className="border p-2 w-full rounded"
				placeholder="Title..."
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
				disabled={loading}
			/>

			<textarea
				className="border p-2 w-full rounded"
				placeholder="Excerpt..."
				value={excerpt}
				onChange={(e) => setExcerpt(e.target.value)}
				required
				disabled={loading}
			/>

			<button
				className="px-4 py-2 bg-blue-600 text-white rounded"
				disabled={loading}
			>
				{loading ? "Creating..." : "Create Post"}
			</button>
		</form>
	);
}
