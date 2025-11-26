"use client";

import { Post } from "../types/Post";
import toast from "react-hot-toast";

interface Props {
	token: string;
	userPosts: Post[];
	onDelete: (id: number) => void;
}

export default function UserPosts({ token, userPosts, onDelete }: Props) {
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

	const handleDelete = async (id?: number) => {
		if (!id) {
			toast.error("Post ID missing!");
			return;
		}

		try {
			const res = await fetch(`${BASE_URL}/Blog/delete/${id}/`, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${token}` },
			});

			if (!res.ok) throw new Error("Failed to delete post");

			onDelete(id);
			toast.success("Post deleted successfully!");
		} catch (err) {
			console.error(err);
			toast.error("Error deleting post!");
		}
	};

	if (userPosts.length === 0)
		return (
			<div className="p-4 text-gray-600 text-center border rounded-lg bg-gray-50">
				You haven't created any posts yet.
			</div>
		);

	return (
		<div className="space-y-4">
			{userPosts.map((post) => (
				<div
					key={post.id}
					className="p-4 border bg-white rounded-xl shadow-sm flex items-center justify-between hover:shadow-md transition"
				>
					<div>
						<p className="font-semibold text-gray-800">{post.title}</p>
						<p className="text-xs text-gray-500">
							{new Date(post.created_at).toLocaleDateString()}
						</p>
					</div>

					<button
						onClick={() => handleDelete(post.id)}
						className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
					>
						Delete
					</button>
				</div>
			))}
		</div>
	);
}
