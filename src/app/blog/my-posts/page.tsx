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

	if (loading) return <p>Loading your posts...</p>;
	if (!token) return <p>Please log in to see your posts.</p>;
	if (userPosts.length === 0) return <p>You have no posts yet.</p>;

	return (
		<div className="flex flex-col min-h-screen p-8 max-w-5xl mx-auto">
			<h1 className="text-3xl font-bold mb-6">My Posts</h1>
			<UserPosts token={token} userPosts={userPosts} onDelete={handleDelete} />
		</div>
	);
}
