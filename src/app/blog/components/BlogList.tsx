"use client";

import { Post } from "../types/Post";
import Link from "next/link";
import Image from "next/image";

export default function BlogList({ posts }: { posts: Post[] }) {
	console.log("All posts from backend:", posts);
	const publishedPosts = posts.filter((post) => post.status === "published");

	if (publishedPosts.length === 0) {
		return (
			<p className="text-center text-gray-500 mt-6">
				No blogs yet. Stay tuned!
			</p>
		);
	}

	return (
		<div className="grid gap-6 md:grid-cols-2">
			{publishedPosts.map((post) => (
				<Link
					key={post.id}
					href={`/blog/detail/${post.id}`}
					className="p-6 border rounded-lg shadow bg-white hover:shadow-lg transition flex flex-col gap-4"
				>
					<h2 className="text-2xl font-semibold">{post.title}</h2>
					<p className="text-gray-500 text-sm mt-1">
						{new Date(post.created_at).toLocaleDateString()}
					</p>
					{post.image && (
						<Image
							src={post.image}
							alt={post.title}
							width={600}
							height={300}
							className="w-full h-48 object-cover rounded"
							unoptimized
						/>
					)}
					<p className="mt-3 text-gray-700">{post.content.slice(0, 120)}...</p>
					<p className="mt-3 text-blue-600 font-medium">Read More →</p>
				</Link>
			))}
		</div>
	);
}
