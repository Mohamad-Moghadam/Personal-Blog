"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Post {
	id: number;
	title: string;
	date: string;
	excerpt: string;
}

function DashboardSidebar({ token }: { token: string }) {
	const [userPosts, setUserPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [title, setTitle] = useState("");
	const [excerpt, setExcerpt] = useState("");
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

	useEffect(() => {
		const fetchUserPosts = async () => {
			try {
				const res = await fetch(`${BASE_URL}/Blog/list/`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				if (!res.ok) throw new Error("Failed to fetch user posts");
				const data: Post[] = await res.json();
				setUserPosts(data);
			} catch {
				setUserPosts([]);
			} finally {
				setLoading(false);
			}
		};
		fetchUserPosts();
	}, [token]);

	const createPost = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await fetch(`${BASE_URL}/Blog/create/`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ title, excerpt }),
			});
			if (!res.ok) throw new Error("Failed to create post");
			const newPost: Post = await res.json();
			setUserPosts([newPost, ...userPosts]);
			setTitle("");
			setExcerpt("");
			setShowForm(false);
		} catch (err) {
			alert("Error creating post");
			console.error(err);
		}
	};

	return (
		<div className="w-80 p-6 bg-gray-100 dark:bg-zinc-900 rounded-xl">
			<h2 className="text-xl font-bold mb-4">My Dashboard</h2>
			<button
				className="w-full mb-4 p-2 bg-blue-600 text-white rounded"
				onClick={() => setShowForm(!showForm)}
			>
				Create New Post
			</button>

			{showForm && (
				<form onSubmit={createPost} className="mb-4 space-y-2">
					<input
						type="text"
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="w-full p-2 border rounded"
						required
					/>
					<textarea
						placeholder="Excerpt"
						value={excerpt}
						onChange={(e) => setExcerpt(e.target.value)}
						className="w-full p-2 border rounded"
						required
					/>
					<button
						type="submit"
						className="w-full p-2 bg-green-600 text-white rounded"
					>
						Save
					</button>
				</form>
			)}

			<h3 className="font-semibold mb-2">My Posts</h3>
			{loading ? (
				<p>Loading...</p>
			) : userPosts.length === 0 ? (
				<p>No posts yet.</p>
			) : (
				<ul className="space-y-2">
					{userPosts.map((post) => (
						<li key={post.id}>
							<Link
								href={`/blog/${post.id}`}
								className="text-blue-600 dark:text-blue-400 hover:underline"
							>
								{post.title}
							</Link>
							<button className="ml-2 text-red-500">Delete</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

function BlogList() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const res = await fetch(`${BASE_URL}/Blog/list/`);
				if (!res.ok) throw new Error("Failed to fetch posts");
				const data: Post[] = await res.json();
				setPosts(data);
			} catch {
				setPosts([]);
			} finally {
				setLoading(false);
			}
		};
		fetchPosts();
	}, []);

	return (
		<div className="flex-1 space-y-6">
			<header className="text-center mb-10">
				<h1 className="text-4xl font-bold mb-3">📝 My Blog</h1>
				<p className="text-gray-600 dark:text-gray-400">
					Thoughts, code, and everything in between
				</p>
			</header>

			{loading ? (
				<p className="text-center text-gray-500">Loading posts...</p>
			) : posts.length === 0 ? (
				<p className="text-center text-gray-500">No posts found.</p>
			) : (
				<div className="space-y-6">
					{posts.map((post) => (
						<article
							key={post.id}
							className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow hover:shadow-lg transition duration-300"
						>
							<h2 className="text-2xl font-bold mb-2">{post.title}</h2>
							<p className="text-sm text-gray-500 mb-3">{post.date}</p>
							<p className="mb-4">{post.excerpt}</p>
							<Link
								href={`/blog/${post.id}`}
								className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
							>
								Read More
							</Link>
						</article>
					))}
				</div>
			)}
		</div>
	);
}

export default function BlogPage() {
	let token: string | null = null;
	if (typeof window !== "undefined") {
		token = localStorage.getItem("access_token");
	}

	return (
		<div className="flex min-h-screen gap-6 px-6 py-12">
			{token && <DashboardSidebar token={token} />}
			<BlogList />
		</div>
	);
}
