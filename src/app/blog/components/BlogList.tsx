"use client";

import { Post } from "../types/Post";
import Link from "next/link";

export default function BlogList({ posts }: { posts: Post[] }) {
	return (
		<div className="grid gap-6 md:grid-cols-2">
			{posts.map((post) => (
				<Link
					key={post.id}
					href={`/blog/detail/${post.id}`}
					className="p-6 border rounded-lg shadow bg-white hover:shadow-lg transition"
				>
					<h2 className="text-2xl font-semibold">{post.title}</h2>
					<p className="text-gray-500 text-sm mt-1">
						{new Date(post.created_at).toLocaleDateString()}
					</p>
					<p className="mt-3 text-gray-700">{post.content.slice(0, 120)}...</p>
					<p className="mt-3 text-blue-600 font-medium">Read More →</p>
				</Link>
			))}
		</div>
	);
}
