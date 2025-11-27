"use client";

import { Post } from "../types/Post";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
	token: string;
	userPosts: Post[];
	onDelete: (id: number) => void;
}

export default function UserPosts({ token, userPosts, onDelete }: Props) {
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
	const router = useRouter();

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

	const handleUpdate = (id: number) => {
		router.push(`/blog/update/${id}`);
	};

	if (userPosts.length === 0) {
		return <p className="text-gray-500 text-center">You have no posts yet.</p>;
	}

	return (
		<div className="space-y-4">
			{userPosts.map((post) => (
				<div
					key={post.id}
					className="flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
				>
					<span className="text-white font-medium">{post.title}</span>

					<div className="flex gap-2">
						<button
							onClick={() => handleUpdate(post.id)}
							className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
						>
							Update
						</button>

						<button
							onClick={() => handleDelete(post.id)}
							className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
						>
							Delete
						</button>
					</div>
				</div>
			))}
		</div>
	);
}
