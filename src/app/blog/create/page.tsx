"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
	const router = useRouter();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [loading, setLoading] = useState(false);
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
	const token =
		typeof window !== "undefined" ? localStorage.getItem("token") : null;

	if (!token) return <p className="p-6 text-red-500">You must be logged in.</p>;

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
				body: JSON.stringify({ title, content, status: "published" }),
			});

			if (!res.ok) throw new Error("Failed to create post");

			toast.success("Post created!");
			router.push("/blog");
		} catch (err) {
			toast.error("Error creating post");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-3xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-4">Create New Post</h1>

			<form className="space-y-4" onSubmit={handleSubmit}>
				<input
					className="w-full p-3 border rounded"
					placeholder="Title..."
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
					disabled={loading}
				/>

				<textarea
					className="w-full p-3 border rounded h-40"
					placeholder="Write your content..."
					value={content}
					onChange={(e) => setContent(e.target.value)}
					required
					disabled={loading}
				/>

				<button
					className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
					disabled={loading}
				>
					{loading ? "Publishing..." : "Publish"}
				</button>
			</form>
		</div>
	);
}
