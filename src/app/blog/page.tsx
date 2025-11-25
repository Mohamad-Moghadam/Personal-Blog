"use client";

import { useEffect, useState } from "react";
import BlogList from "./components/BlogList";
import DashboardSidebar from "./components/DashboardSidebar";
import { Post } from "./types/Post";

export default function BlogPage() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [token, setToken] = useState<string | null>(null);
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

	useEffect(() => {
		// fetch token
		const t = localStorage.getItem("token");
		setToken(t);

		// fetch all posts
		const fetchPosts = async () => {
			try {
				const res = await fetch(`${BASE_URL}/Blog/list/`);
				if (!res.ok) throw new Error("Failed to fetch posts");
				const data: Post[] = await res.json();
				setPosts(data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchPosts();
	}, []);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
			{token && (
				<div className="md:col-span-1">
					<DashboardSidebar token={token} />
				</div>
			)}

			<div className={token ? "md:col-span-2" : "md:col-span-3"}>
				<BlogList posts={posts} />
			</div>
		</div>
	);
}
