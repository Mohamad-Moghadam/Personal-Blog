"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

interface Post {
	id: number;
	title: string;
	content: string;
	status: "draft" | "published";
	image?: string;
}

export default function UpdatePostPage() {
	const params = useParams();
	const postId = params?.id;
	const [post, setPost] = useState<Post | null>(null);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [status, setStatus] = useState<"draft" | "published">("draft");
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		if (!postId) return;
		const fetchPost = async () => {
			const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
			try {
				const res = await fetch(`${BASE_URL}/Blog/detail/${postId}/`);
				const data = await res.json();

				setPost(data);
				setTitle(data.title);
				setContent(data.content);
				setStatus(data.status);
			} catch {
				toast.error("Failed to load post");
			} finally {
				setLoading(false);
			}
		};
		fetchPost();
	}, [postId]);

	const handleUpdate = async () => {
		if (!postId) return;

		const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
		const token =
			typeof window !== "undefined" ? localStorage.getItem("token") : null;

		const formData = new FormData();
		formData.append("title", title);
		formData.append("content", content);
		formData.append("status", status);

		if (imageFile) {
			formData.append("image", imageFile);
		}

		try {
			const res = await fetch(`${BASE_URL}/Blog/update/${postId}/`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
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

				<div>
					<label className="block mb-1 font-medium text-white">Status</label>
					<select
						value={status}
						onChange={(e) => setStatus(e.target.value as "draft" | "published")}
						className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
					>
						<option value="draft">Draft</option>
						<option value="published">Published</option>
					</select>
				</div>

				{post.image && (
					<div className="mt-3">
						<p className="mb-2 text-gray-300">Current Image:</p>
						<Image
							src={post.image}
							alt="Post Image"
							width={500}
							height={300}
							className="rounded-lg object-cover"
						/>
					</div>
				)}

				<div className="mt-4">
					<label className="block mb-2 text-gray-200">Change Image</label>
					<input
						type="file"
						accept="image/*"
						onChange={(e) => {
							if (e.target.files) setImageFile(e.target.files[0]);
						}}
						className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded"
					/>
				</div>

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
