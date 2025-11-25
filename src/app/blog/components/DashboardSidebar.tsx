"use client";

import CreatePostForm from "./CreatePostForm";
import UserPosts from "./UserPosts";
import { Post } from "../types/Post";
import { useState } from "react";

export default function DashboardSidebar() {
	const [userPosts, setUserPosts] = useState<Post[]>([]);

	const handleCreate = (post: Post) => {
		setUserPosts([post, ...userPosts]);
	};

	const handleDelete = (id: number) => {
		setUserPosts(userPosts.filter((p) => p.id !== id));
	};

	return (
		<div className="p-4 border rounded-lg space-y-6 bg-gray-50">
			<h2 className="text-xl font-semibold">Dashboard</h2>

			<div>
				<h3 className="font-medium mb-2">Create Post</h3>
				<CreatePostForm onCreate={handleCreate} />
			</div>

			<div>
				<h3 className="font-medium mb-2">Your Posts</h3>
				<UserPosts userPosts={userPosts} onDelete={handleDelete} />
			</div>
		</div>
	);
}
