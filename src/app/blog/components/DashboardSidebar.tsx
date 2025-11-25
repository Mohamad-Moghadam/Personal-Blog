"use client";

import { useState, useEffect } from "react";
import { Post } from "../types/Post";
import CreatePostForm from "./CreatePostForm";
import UserPosts from "./UserPosts";

interface Props {
	token: string;
}

export default function DashboardSidebar({ token }: Props) {
	const [userPosts, setUserPosts] = useState<Post[]>([]);
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

	useEffect(() => {
		const fetchUserPosts = async () => {
			try {
				const res = await fetch(`${BASE_URL}/Blog/list/`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				if (!res.ok) throw new Error("Failed to fetch user posts");
				const data: Post[] = await res.json();
				setUserPosts(data);
			} catch (err) {
				console.error(err);
				setUserPosts([]);
			}
		};
		fetchUserPosts();
	}, [token]);

	const handleCreate = (post: Post) => setUserPosts([post, ...userPosts]);
	const handleDelete = (id: number) =>
		setUserPosts(userPosts.filter((p) => p.id !== id));

	return (
		<div className="p-4 border rounded-lg space-y-6 bg-gray-50">
			<h2 className="text-xl font-semibold">Dashboard</h2>
			<div>
				<h3 className="font-medium mb-2">Create Post</h3>
				<CreatePostForm token={token} onCreate={handleCreate} />
			</div>
			<div>
				<h3 className="font-medium mb-2">Your Posts</h3>
				<UserPosts
					token={token}
					userPosts={userPosts}
					onDelete={handleDelete}
				/>
			</div>
		</div>
	);
}
