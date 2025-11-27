"use client";

import { useState, useEffect } from "react";
import UserPosts from "../components/UserPosts";

export default function MyPostsPage() {
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		setToken(localStorage.getItem("token"));
	}, []);

	return (
		<div className="flex flex-col min-h-screen p-8 max-w-5xl mx-auto">
			<h1 className="text-3xl font-bold mb-6">My Posts</h1>
			<UserPosts token={token} />
		</div>
	);
}
