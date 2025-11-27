"use client";

import { useEffect, useState } from "react";
import { Post } from "../types/Post";
import UserPosts from "../components/UserPosts";

export default function MyPostsPage() {
	const [token, setToken] = useState<string | null>(null);
	const [userPosts, setUserPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		setToken(storedToken);

		if (!storedToken) {
			setLoading(false);
			return;
		}

		const fetchUserPosts = async () => {
			try {
				const res = await fetch(`${BASE_URL}/Blog/my-posts/`, {
					headers: { Authorization: `Bearer ${storedToken}` },
				});

				if (!res.ok) throw new Error("Failed to fetch posts");

				const data: Post[] = await res.json();
				setUserPosts(data);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchUserPosts();
	}, []);

	const handleDelete = (id: number) => {
		setUserPosts(userPosts.filter((post) => post.id !== id));
	};

	if (loading)
		return (
			<p className="p-6 text-center text-gray-300 animate-pulse">
				Loading your posts…
			</p>
		);
	if (!token)
		return (
			<p className="p-6 text-center text-red-400 font-semibold">
				Please log in to see your posts.
			</p>
		);
	if (userPosts.length === 0)
		return (
			<p className="p-6 text-center text-gray-400">You have no posts yet.</p>
		);

	return (
		<div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-white">
			<div className="max-w-5xl w-full mx-auto">
				<div className="mb-10 text-center">
					<h1 className="text-4xl font-extrabold text-yellow-400">My Posts</h1>
					<p className="mt-2 text-gray-300">
						Manage and delete your blog posts directly from here.
					</p>
				</div>

				<div className="space-y-6">
					{userPosts.map((post) => (
						<UserPosts
							key={post.id}
							token={token!}
							userPosts={[post]}
							onDelete={handleDelete}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
