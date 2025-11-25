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

	return (
		<div className="space-y-3">
			{userPosts.map((post) => (
				<div key={post.id} className="p-3 border rounded flex justify-between">
					<span>{post.title}</span>
					<button
						onClick={() => handleDelete(post.id)}
						className="text-red-600"
					>
						Delete
					</button>
				</div>
			))}
		</div>
	);
}
