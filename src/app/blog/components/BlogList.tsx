"use client";

import { Post } from "../types/Post";
import Link from "next/link";

export default function BlogList({ posts }: { posts: Post[] }) {
	return (
		<div className="space-y-4">
			{posts.map((post) => (
				<div key={post.id} className="p-4 border rounded-md">
					<h2 className="text-xl font-semibold">{post.title}</h2>
					<p className="text-sm text-gray-500">
						{new Date(post.created_at).toLocaleDateString()}
					</p>
					<p className="mt-2 text-gray-700">{post.content.slice(0, 100)}...</p>
					<Link
						href={`/blog/${post.id}`}
						className="text-blue-500 mt-2 inline-block"
					>
						Read more →
					</Link>
				</div>
			))}
		</div>
	);
}
