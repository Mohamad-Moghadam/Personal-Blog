"use client";

import { Post } from "../types/Post";
import Link from "next/link";

interface Props {
	posts: Post[];
	onDelete?: (id: number) => void;
	token?: string;
}

export default function BlogList({ posts, onDelete, token }: Props) {
	return (
		<div className="grid gap-6 md:grid-cols-2">
			{posts.map((post) => (
				<div
					key={post.id}
					className="p-6 border rounded-lg shadow bg-white relative"
				>
					<Link href={`/blog/detail/${post.id}`}>
						<h2 className="text-2xl font-semibold">{post.title}</h2>
						<p className="text-gray-500 text-sm mt-1">
							{new Date(post.created_at).toLocaleDateString()}
						</p>
						<p className="mt-3 text-gray-700">
							{post.content.slice(0, 120)}...
						</p>
						<p className="mt-3 text-blue-600 font-medium">Read More →</p>
					</Link>

					{/* فقط اگر onDelete داده شده باشد دکمه ظاهر شود */}
					{onDelete && (
						<button
							onClick={() => onDelete(post.id)}
							className="absolute top-3 right-3 text-red-600"
						>
							Delete
						</button>
					)}
				</div>
			))}
		</div>
	);
}
