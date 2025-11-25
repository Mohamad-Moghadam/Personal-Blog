"use client";

import { Post } from "../types/Post";

export default function UserPosts({
	userPosts,
	onDelete,
}: {
	userPosts: Post[];
	onDelete: (id: number) => void;
}) {
	return (
		<div className="space-y-3">
			{userPosts.map((post) => (
				<div key={post.id} className="p-3 border rounded flex justify-between">
					<span>{post.title}</span>
					<button onClick={() => onDelete(post.id)} className="text-red-600">
						Delete
					</button>
				</div>
			))}
		</div>
	);
}
