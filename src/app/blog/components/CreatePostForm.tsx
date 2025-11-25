"use client";

import React, { useState } from "react";

export default function CreatePostForm({
	onCreate,
}: {
	onCreate: (p: any) => void;
}) {
	const [title, setTitle] = useState("");
	const [excerpt, setExcerpt] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const newPost = {
			id: Date.now(),
			title,
			excerpt,
			date: new Date().toISOString().slice(0, 10),
		};
		onCreate(newPost);
		setTitle("");
		setExcerpt("");
	};

	return (
		<form className="space-y-3" onSubmit={handleSubmit}>
			<input
				className="border p-2 w-full rounded"
				placeholder="Title..."
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>

			<textarea
				className="border p-2 w-full rounded"
				placeholder="Excerpt..."
				value={excerpt}
				onChange={(e) => setExcerpt(e.target.value)}
			/>

			<button className="px-4 py-2 bg-blue-600 text-white rounded">
				Create Post
			</button>
		</form>
	);
}
