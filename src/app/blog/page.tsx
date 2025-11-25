"use client";

import { useState, useEffect } from "react";
import BlogList from "./components/BlogList";
import DashboardSidebar from "./components/DashboardSidebar";
import { Post } from "./types/Post";

export default function BlogPage() {
	const [posts, setPosts] = useState<Post[]>([
		{
			id: 1,
			title: "Welcome to My Blog",
			excerpt: "This is the first post...",
			date: "2025-01-01",
		},
	]);

	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		setLoggedIn(!!token);
	}, []);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
			{loggedIn && (
				<div className="md:col-span-1">
					<DashboardSidebar />
				</div>
			)}

			<div className={loggedIn ? "md:col-span-2" : "md:col-span-3"}>
				<BlogList posts={posts} />
			</div>
		</div>
	);
}
