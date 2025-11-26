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
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

	useEffect(() => {
		if (!token) return;

		const fetchUserPosts = async () => {
			try {
				setLoading(true);
				setError(null);

				const res = await fetch(`${BASE_URL}/Blog/my-posts/`, {
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});

				if (!res.ok) {
					throw new Error(`Failed to fetch posts: ${res.status}`);
				}

				const data: Post[] = await res.json();
				setUserPosts(data);
			} catch (err: any) {
				setError(err.message || "Unknown error");
				setUserPosts([]);
			} finally {
				setLoading(false);
			}
		};

		fetchUserPosts();
	}, [token, BASE_URL]);

	const handleCreate = (post: Post) => {
		setUserPosts((prev) => [post, ...prev]);
	};

	const handleDelete = (id: number) => {
		setUserPosts((prev) => prev.filter((p) => p.id !== id));
	};

	return (
		<div className="p-4 border rounded-lg space-y-6 bg-gray-50">
			<h2 className="text-xl font-semibold">Dashboard</h2>

			<div>
				<h3 className="font-medium mb-2">Create Post</h3>
				<CreatePostForm token={token} onCreate={handleCreate} />
			</div>

			<div>
				<h3 className="font-medium mb-2">Your Posts</h3>

				{loading && <p>Loading...</p>}
				{error && <p className="text-red-600">Error: {error}</p>}
				{!loading && !error && userPosts.length === 0 && (
					<p className="text-gray-600">You have no posts yet.</p>
				)}

				<UserPosts
					token={token}
					userPosts={userPosts}
					onDelete={handleDelete}
				/>
			</div>
		</div>
	);
}
