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

	const handleDelete = async (id: number) => {
		try {
			const res = await fetch(`${BASE_URL}/Blog/delete/${id}/`, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${token}` },
			});

			if (!res.ok) throw new Error("Failed to delete");

			onDelete(id);
			toast.success("Post deleted!");
		} catch {
			toast.error("Error deleting post");
		}
	};

	if (userPosts.length === 0) {
		return <p className="text-gray-500 text-center">You have no posts yet.</p>;
	}

	return (
		<div className="space-y-4">
			{userPosts.map((post) => (
				<div
					key={post.id}
					className="flex justify-between items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
				>
					<span className="text-gray-800 font-medium">{post.title}</span>

					<button
						onClick={() => handleDelete(post.id)}
						className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
					>
						Delete
					</button>
				</div>
			))}
		</div>
	);
}
